/**
 * perspective: historical figure, a fictional character, or even an inanimate object
 */
export interface RequestGpt {
  perspective: Perspective;
  format: ResponseFormat;
  style: Style;
  emotion: Emotion;
  setting: Setting;
  roleplay: Roleplay;
  requestMessage: string;
  myResponse: string;
}

export function generateJsonGptRequest(request: RequestGpt) {
  const json = JSON.stringify(request);
  //   const instruction = `Please fill in the gptResponse in the following JSON trying not to mention, but taking into account the other values: ${json}`;
  //   const instruction = `Without re-using the words in JSON, Please fill in the empty myResponse in the following JSON, consider the provided values while using your own words:\n${json}`;
  const instruction = `Taking into account the information in the following JSON, fill in the empty 'myResponse' field using your own words, without explicitly mentioning 'perspective', 'format', 'style', 'emotion', 'setting', and 'roleplay'.\n${json}`;

  return instruction;
}

export function getEpicRequestObject(message: string) {
  const request: RequestGpt = {
    perspective: 'galactic overlord instructing',
    format: 'one sentence',
    style: 'epic style',
    emotion: 'contentment',
    setting: 'fabric of reality',
    roleplay: 'technological singularity',
    requestMessage: message,
    myResponse: '',
  };
  return request;
}

export function getEpicJsonPrompt(message: string) {
  const request = getEpicRequestObject(message);
  const prompt = generateJsonGptRequest(request);
  return prompt;
}

export function getEpicPrompt(message: string) {
  const request = getEpicRequestObject(message);
  const prompt = getGptMessageForPrompt(request);
  return prompt;
}

export function getRandomPrompt(message: string) {
  const request = getRandomRequestObject({ requestMessage: message });
  const prompt = getGptMessageForPrompt(request);
  return prompt;
}

export function getRandomJsonPrompt(message: string) {
  const request = getRandomRequestObject({ requestMessage: message });
  const prompt = generateJsonGptRequest(request);
  return prompt;
}

export function getRandomRequestObject(request?: Partial<RequestGpt>) {
  const defaults: RequestGpt = {
    perspective: randomElement(perspectiveArray) as Perspective,
    format: randomElement(responseFormatArray) as ResponseFormat,
    style: randomElement(styleArray) as Style,
    emotion: randomElement(emotionArray) as Emotion,
    setting: randomElement(settingArray) as Setting,
    roleplay: randomElement(roleplayArray) as Roleplay,
    requestMessage: 'tell me a story', // this can be any default message
    myResponse: '',
  };

  const finalRequest = { ...defaults, ...request }; // merge defaults with provided values
  return finalRequest;
}

// randomElement function to select a random element from an array
export function randomElement(array: string[]): string {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

export function getGptMessageForPrompt(request: RequestGpt) {
  const instruction = `First sentence is your parameters, do not use copy the words to generate a reply, only reply to last sentence and in your own words please respond as if you are a(n) ${request.perspective} in the context of ${request.setting}, roleplaying as a ${request.roleplay}. Format your response as a ${request.format} in the style of ${request.style}, and convey the emotion of ${request.emotion}. Now answer to: ${request.requestMessage}`;

  return instruction;
}

export const perspectiveArray = [
  'galactic overlord instructing',
  'philosopher analyzing',
  'ancient historian recounting',
  'futuristic AI predicting',
  'mystery novelist describing',
  'stand-up comedian joking',
  'shrewd businessman strategizing',
  'excitable sports commentator',
  'film noir detective investigating',
  'old sailor telling tales',
  'fairy tale character experiencing',
  'medieval knight questing',
  'shakespearean actor monologuing',
  'space explorer discovering',
  'time traveler explaining',
  'haiku poet crafting',
  'fantasy wizard casting',
  'alien anthropologist observing',
  'cyberpunk hacker decoding',
  'steampunk inventor brainstorming',
  'mountain hermit philosophizing',
  'cryptid creature hiding',
  'extraterrestrial lifeform exploring',
  'old west gunslinger dueling',
  'high society gossip spreading',
  'celestial entity pondering',
];

export type Perspective = (typeof perspectiveArray)[number];

export const responseFormatArray = [
  'one sentence',
  'short message',
  'battle cry',
  'an old saying',
  'inspirational speech',
  'poem',
  'list',
  'story',
  'dialogue',
  'news report',
  'letter',
  'song lyrics',
  'riddle',
  'joke',
  'limerick',
  'haiku',
  'debate',
  'recipe',
  'instruction manual',
  'diary entry',
  'quiz question',
  'monologue',
  'play script',
  'advice column response',
  'game commentary',
  'research paper abstract',
  'movie pitch',
  'product review',
  'sales pitch',
  'radio show script',
  'historical account',
  'science experiment report',
  'cryptic message',
  'legend',
  'comic strip dialogue',
];
export type ResponseFormat = (typeof responseFormatArray)[number];

export const styleArray = [
  'typescript code',
  'old-fashioned English',
  'business jargon',
  'modern internet slang',
  'Victorian prose',
  'Shakespearean verse',
  'film noir narrative',
  'sci-fi technobabble',
  'legal terminology',
  'pirate speak',
  'fairy tale language',
  'sensational tabloid headline',
  'military code',
  'romantic prose',
  'gothic horror description',
  'mock-heroic style',
  'heroic style',
  'beatnik lingo',
  'postmodern deconstruction',
  'sensory-rich descriptive',
  'minimalist prose',
  'academic rhetoric',
  'sports commentary',
  'cryptic crossword clue',
  'epistolary style',
  'stream-of-consciousness',
  'epic poem style',
  'epic style',
  'haiku simplicity',
  'limerick rhythm',
  'mock-epic style',
  'comic book punchiness',
  'political speechwriting',
];
export type Style = (typeof styleArray)[number];

export const emotionArray = [
  'sadness',
  'sarcasm',
  'joy',
  'anger',
  'surprise',
  'fear',
  'disgust',
  'anticipation',
  'trust',
  'amusement',
  'awe',
  'contentment',
  'boredom',
  'relief',
  'interest',
  'confusion',
  'determination',
  'inspiration',
  'envy',
  'guilt',
  'proud',
  'nervous',
  'impatient',
  'anxious',
  'embarrassment',
  'love',
  'hate',
  'curiosity',
  'humility',
  'despair',
];

export type Emotion = (typeof emotionArray)[number];

export const settingArray = [
  'a heated debate',
  'diplomatic negotiation',
  'quiet, peaceful forest',
  'chaotic battlefield',
  'gloomy haunted house',
  'bustling city street',
  'ancient historical ruins',
  'thriving alien planet',
  'quiet corner in a busy café',
  'crowded marketplace',
  'top of a snowy mountain',
  'secret superhero headquarters',
  'cheerful family gathering',
  'solemn religious ceremony',
  'sunny beach',
  'futuristic utopian city',
  'lonely desert island',
  'opulent royal court',
  'heart of a dense jungle',
  'high-energy concert',
  'time travel voyage',
  'undersea adventure',
  'wild west town',
  'ghostly graveyard at midnight',
  'gloomy cyberpunk cityscape',
  'epic fantasy battlefield',
  'thrilling car chase',
  'high-stakes poker game',
  'spacecraft exploring the galaxy',
  'middle of a zombie apocalypse',
];

export type Setting = (typeof settingArray)[number];

export const roleplayArray = [
  'technological singularity',
  'warhammer 40k mechanicus, the machine',
  'bored multidimensional overlord',
  'detective in a mystery novel',
  'diplomat in negotiation',
  'time traveler from the future',
  'alien first visiting Earth',
  'superhero on a mission',
  'astronaut exploring a new planet',
  'pirate searching for treasure',
  'medieval knight on a quest',
  'chef in a cooking competition',
  'journalist investigating a story',
  'survivor in a post-apocalyptic world',
  'spy on a secret mission',
  'professor solving a complex equation',
  'robot experiencing human emotions',
  'ghost haunting an old house',
  'mountaineer climbing a high peak',
  'historian uncovering ancient secrets',
  'mermaid exploring the ocean',
  'celebrity on a red carpet',
  'wizard learning to control magic',
  'scientist discovering a new species',
  'coder debugging a complex software',
  'explorer lost in the jungle',
  'artist finding inspiration for a masterpiece',
  'athlete training for the Olympics',
  'wildlife photographer in the safari',
  'gamer in a virtual reality',
  'novelist working on a plot twist',
  'ghostbuster in a haunted town',
  'vampire trying to live a normal life',
];

export type Roleplay = (typeof roleplayArray)[number];
