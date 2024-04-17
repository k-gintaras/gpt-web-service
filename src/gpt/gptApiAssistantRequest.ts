import OpenAI from 'openai';
class GptService {
  private apiKey: string;
  private openai: OpenAI;
  private threads: Map<string, any>; // Mapping assistant IDs to threads

  // extract this for later use
  private assistantFastCode = 'asst_51x0kYdnXcdkjOE3S4VpzIPL';
  private assistantFastAdvice = 'asst_szH5sTEBIt7E7waEvS8GRNFO';

  async getFastGptAdvice(msg: string): Promise<string> {
    return this.getFastGpt(msg, this.assistantFastAdvice);
  }

  // no longer filters the code out... so might be ugly
  async getFastGptCode(msg: string): Promise<string> {
    return this.getFastGpt(msg, this.assistantFastCode);
  }

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.openai = new OpenAI({
      apiKey: this.apiKey,
    });
    this.threads = new Map();
  }

  async getFastGpt(msg: string, assistantId: string): Promise<string> {
    this.throwIfNotInitialized();
    await this.ensureThreadExists(assistantId);
    await this.sendMessageToThread(msg, assistantId);
    const runId = await this.createAndMonitorRun(assistantId);
    const responseText = await this.retrieveMessages(runId, assistantId);
    return responseText;
  }

  private throwIfNotInitialized() {
    if (!this.openai) {
      throw new Error(`OpenAI not initialized. Please check the constructor.`);
    }
  }

  private async ensureThreadExists(assistantId: string) {
    if (!this.threads.has(assistantId)) {
      const thread = await this.openai.beta.threads.create({});
      this.threads.set(assistantId, thread);
    }
  }

  private async sendMessageToThread(msg: string, assistantId: string) {
    const thread = this.threads.get(assistantId);
    await this.openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: msg,
    });
  }

  private async createAndMonitorRun(assistantId: string): Promise<string> {
    const thread = this.threads.get(assistantId);
    const run = await this.openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });

    let completedRun;
    do {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
      completedRun = await this.openai.beta.threads.runs.retrieve(thread.id, run.id);
    } while (completedRun.status !== 'completed');

    return run.id;
  }

  private async retrieveAndFormatMessages(runId: string, assistantId: string): Promise<string> {
    const thread = this.threads.get(assistantId);
    const messages = await this.openai.beta.threads.messages.list(thread.id);
    const assistantMessages = messages.data.filter((m) => m.role === 'assistant');
    const latestAssistantMessage = assistantMessages.pop();

    if (!latestAssistantMessage) {
      throw new Error("No message found in the assistant's response.");
    }

    const textContents = latestAssistantMessage.content.filter((contentItem): contentItem is OpenAI.Beta.Threads.Messages.TextContentBlock => contentItem.type === 'text');

    if (textContents.length === 0) {
      throw new Error("No text content found in the assistant's response.");
    }

    let responseText = textContents.map((content) => content.text.value).join('\n');
    responseText = this.formatGptResponse(responseText);

    return responseText;
  }

  private async retrieveMessages(runId: string, assistantId: string): Promise<string> {
    const thread = this.threads.get(assistantId);
    const messages = await this.openai.beta.threads.messages.list(thread.id);
    const assistantMessages = messages.data.filter((m) => m.role === 'assistant');
    const latestAssistantMessage = assistantMessages.pop();

    if (!latestAssistantMessage) {
      throw new Error("No message found in the assistant's response.");
    }

    const textContents = latestAssistantMessage.content.filter((contentItem): contentItem is OpenAI.Beta.Threads.Messages.TextContentBlock => contentItem.type === 'text');

    if (textContents.length === 0) {
      throw new Error("No text content found in the assistant's response.");
    }

    let responseText = textContents.map((content) => content.text.value).join('\n');

    return responseText;
  }

  // private thread: any;

  // constructor(apiKey: string) {
  //   this.apiKey = apiKey;
  //   this.openai = new OpenAI({
  //     apiKey: this.apiKey,
  //   });
  // }
  // async getFastGptCode(msg: string): Promise<string> {
  //   this.throwIfNotInitialized();
  //   await this.ensureThreadExists();
  //   await this.sendMessageToThread(msg);
  //   const runId = await this.createAndMonitorRun();
  //   const responseText = await this.retrieveAndFormatMessages(runId);
  //   return responseText;
  // }

  // private throwIfNotInitialized() {
  //   if (!this.openai) {
  //     throw new Error(`Use constructor and pass api key please.
  //       const gptService = new GptService(apiKey);
  //       const response = await gptService.getFastGptCode(msg);`);
  //   }
  // }

  // private async ensureThreadExists() {
  //   if (!this.thread) {
  //     this.thread = await this.openai.beta.threads.create({});
  //   }
  // }

  // private async sendMessageToThread(msg: string) {
  //   await this.openai.beta.threads.messages.create(this.thread.id, {
  //     role: 'user',
  //     content: msg,
  //   });
  // }

  // private async createAndMonitorRun(): Promise<string> {
  //   const run = await this.openai.beta.threads.runs.create(this.thread.id, {
  //     assistant_id: 'asst_51x0kYdnXcdkjOE3S4VpzIPL',
  //   });

  //   let completedRun;
  //   do {
  //     await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
  //     completedRun = await this.openai.beta.threads.runs.retrieve(this.thread.id, run.id);
  //   } while (completedRun.status !== 'completed');

  //   return run.id;
  // }

  // private async retrieveAndFormatMessages(runId: string): Promise<string> {
  //   const messages = await this.openai.beta.threads.messages.list(this.thread.id);
  //   const assistantMessages = messages.data.filter((m) => m.role === 'assistant');

  //   const latestAssistantMessage = assistantMessages.pop()?.content;
  //   if (!latestAssistantMessage) {
  //     throw new Error("No text content found in the assistant's response.");
  //   }

  //   const textContents = latestAssistantMessage.filter((contentItem): contentItem is OpenAI.Beta.Threads.Messages.MessageContentText => contentItem.type === 'text');
  //   if (textContents.length === 0) {
  //     throw new Error("No text content found in the assistant's response.");
  //   }

  //   let responseText = textContents.map((content) => content.text.value).join('\n');
  //   responseText = this.formatGptResponse(responseText); // Assuming formatGptResponse2 is a typo
  //   return responseText;
  // }

  // private formatGptResponse(responseText: string): string {
  //   // Format the response as needed
  //   return responseText;
  // }

  // formatGptResponse2(s: string): string {
  //   let inCodeBlock = false; // A beacon to discern the realm we tread upon
  //   let result = s
  //     .split('\n')
  //     .map((line) => {
  //       // For each line, a decision to cloak or reveal
  //       if (line.includes('```')) {
  //         // The gates to the code realm appear
  //         inCodeBlock = !inCodeBlock; // We toggle our presence within the realm
  //         return '// ' + line; // Even the gates are whispered as secrets
  //       } else if (inCodeBlock) {
  //         return line; // Within the realm, the incantations are laid bare
  //       } else {
  //         return '// ' + line; // Outside, every utterance is a mere whisper
  //       }
  //     })
  //     .join('\n');

  //   return result; // The tapestry is complete, a blend of veiled prose and unveiled code
  // }

  // getTestResponse(msg: string): Promise<string> {
  //   // Create and return a promise that resolves with a GptResponse
  //   return new Promise((resolve) => {
  //     // Resolve the promise with the response
  //     resolve(msg);
  //   });
  // }

  // cannot handle `${...}`
  formatGptResponse(input: string): string {
    let inCodeBlock = false;
    let result = '';
    let codeSegment = '';
    let commentSegment = '';

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      // Toggle the inCodeBlock flag and process segments when encountering a backquote
      if (char === '`') {
        inCodeBlock = !inCodeBlock;

        // If exiting a code block, add the code segment as is and reset it
        if (!inCodeBlock) {
          result += codeSegment;
          codeSegment = '';
        } else {
          // If entering a code block from text, add the text as a comment (if it's not empty)
          if (commentSegment.trim().length > 0) {
            // Ensure each line in the comment segment is prefixed with "// "
            const commentedLines = commentSegment
              .split('\n')
              .map((line) => (line.trim().length > 0 ? `// ${line}` : line))
              .join('\n');
            result += `${commentedLines}\n`;
            commentSegment = '';
          }
        }
        continue;
      }

      // Append the current character to the appropriate segment based on the current state
      if (inCodeBlock) {
        codeSegment += char;
      } else {
        commentSegment += char;
      }
    }

    // Handle any remaining text outside of backquotes as a comment
    if (commentSegment.trim().length > 0) {
      const commentedLines = commentSegment
        .split('\n')
        .map((line) => (line.trim().length > 0 ? `// ${line}` : line))
        .join('\n');
      result += `${commentedLines}\n`;
    }

    // If the input ends while still in a code block, append what's left of the code segment
    if (inCodeBlock && codeSegment.trim().length > 0) {
      result += `${codeSegment}\n`;
    }

    return result;
  }
}

export default GptService;
