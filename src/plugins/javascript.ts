import * as JavaScriptObfuscator from 'javascript-obfuscator';
import type { ObfuscationOptions, TransformPlugin, TransformMode } from '../types';

export const defaultOptions: ObfuscationOptions = {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  disableConsoleOutput: false,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,
  rotateStringArray: true,
  selfDefending: false,
  splitStrings: true,
  stringArray: true,
  stringArrayEncoding: ['none'],
  stringArrayThreshold: 0.75,
  unicodeEscapeSequence: false,
};

export const javascriptPlugin: TransformPlugin = {
  name: 'JavaScript',
  transform: async (code: string, options: ObfuscationOptions, mode: TransformMode) => {
    try {
      if (mode === 'obfuscate') {
        const result = JavaScriptObfuscator.obfuscate(code, options);
        return result.getObfuscatedCode();
      } else {
        // For deobfuscation, we'll try to format the code to make it more readable
        const result = JavaScriptObfuscator.obfuscate(code, {
          ...defaultOptions,
          compact: false,
          controlFlowFlattening: false,
          deadCodeInjection: false,
          debugProtection: false,
          rotateStringArray: false,
          selfDefending: false,
          splitStrings: false,
          stringArray: false,
          stringArrayEncoding: ['none'],
          unicodeEscapeSequence: false,
        });
        return result.getObfuscatedCode();
      }
    } catch (error) {
      throw new Error(`${mode === 'obfuscate' ? 'Obfuscation' : 'Deobfuscation'} failed: ${(error as Error).message}`);
    }
  },
  defaultOptions,
};