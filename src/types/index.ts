export type TransformMode = 'obfuscate' | 'deobfuscate';

export interface ObfuscationOptions {
  compact: boolean;
  controlFlowFlattening: boolean;
  deadCodeInjection: boolean;
  debugProtection: boolean;
  disableConsoleOutput: boolean;
  identifierNamesGenerator: 'hexadecimal' | 'mangled';
  renameGlobals: boolean;
  rotateStringArray: boolean;
  selfDefending: boolean;
  splitStrings: boolean;
  stringArray: boolean;
  stringArrayEncoding: ('none' | 'base64' | 'rc4')[];
  stringArrayThreshold: number;
  unicodeEscapeSequence: boolean;
}

export interface TransformPlugin {
  name: string;
  transform: (code: string, options: any, mode: TransformMode) => Promise<string>;
  defaultOptions: any;
}