export interface CodingRequestGpt {
  language: CodeLanguage;
  style: CodeStyle;
  complexity: CodeComplexity;
  problemStatement: string;
}

/**
 * @example
 * CodingRequestGpt style
  'concise', // minimalistic code style focusing on solving the problem directly
  'detailed with documentation', // code with additional comments and docstrings
  'bare-bones', // code with only the absolute necessary components to solve the problem
  'with error handling', // code that includes try-catch blocks and checks for possible errors
  'optimized', // code that prioritizes efficiency and performance
  'modular', // code that is divided into functions or classes for better organization and readability
  'defensive', // code that checks for wrong or unexpected inputs and fails gracefully
  'test-driven', // code that includes accompanying unit tests
  'compliant with coding standards', // code that follows specific style guidelines (e.g., PEP8 for Python, Google Style for Java)
  'accessible', // code that includes features for accessibility (more relevant for HTML/CSS)
 */
export function getCodeJsonGptRequest(request: CodingRequestGpt) {
  const json = JSON.stringify(request);
  const instruction = `${json}`;
  return instruction;
}

export function getDefaultRequestObject(statement: string) {
  const request: CodingRequestGpt = {
    language: 'typescript',
    style: 'concise',
    complexity: 'medium',
    problemStatement: statement,
  };
  return request;
}

export const codeStyleArray = [
  'concise', // minimalistic code style focusing on solving the problem directly
  'detailed with documentation', // code with additional comments and docstrings
  'bare-bones', // code with only the absolute necessary components to solve the problem
  'with error handling', // code that includes try-catch blocks and checks for possible errors
  'optimized', // code that prioritizes efficiency and performance
  'modular', // code that is divided into functions or classes for better organization and readability
  'defensive', // code that checks for wrong or unexpected inputs and fails gracefully
  'test-driven', // code that includes accompanying unit tests
  'compliant with coding standards', // code that follows specific style guidelines (e.g., PEP8 for Python, Google Style for Java)
  'accessible', // code that includes features for accessibility (more relevant for HTML/CSS)
];

export type CodeStyle =
  | 'concise' /** minimalistic code style focusing on solving the problem directly */
  | 'detailed with documentation'
  | 'bare-bones'
  | 'with error handling'
  | 'optimized'
  | 'modular'
  | 'defensive'
  | 'test-driven'
  | 'compliant with coding standards'
  | 'accessible';

export const codeLanguageArray = ['typescript', 'javascript', 'java', 'html'];

export type CodeLanguage =
  | 'code comment'
  | 'assume code language'
  | 'ERD'
  | 'use case'
  | 'UML'
  | 'typescript'
  | 'javascript'
  | 'java'
  | 'python'
  | 'html';

export const codeComplexityArray = ['low', 'medium', 'high'];

export type CodeComplexity = 'low' | 'medium' | 'high';
