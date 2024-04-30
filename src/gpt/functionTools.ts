export const task_response_function_tool = {
  type: 'function',
  function: {
    name: 'get_task_details',
    description: 'Function retrieves task name and description from user input.',
    parameters: {
      type: 'object',
      properties: {
        taskName: { type: 'string', description: 'The name of the task' },
        taskDescription: { type: 'string', description: 'A brief description of the task' },
      },
      required: ['taskName', 'taskDescription'],
    },
  },
};
