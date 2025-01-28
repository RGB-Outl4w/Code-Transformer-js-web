import React from 'react';
import type { ObfuscationOptions, TransformMode } from '../types';
import { defaultOptions } from '../plugins/javascript';

interface SettingsPanelProps {
  options: ObfuscationOptions;
  onChange: (options: ObfuscationOptions) => void;
  mode: TransformMode;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ options, onChange, mode }) => {
  const handleChange = (key: keyof ObfuscationOptions, value: any) => {
    onChange({ ...options, [key]: value });
  };

  if (mode === 'deobfuscate') {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Deobfuscation Mode</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          In deobfuscation mode, the tool will attempt to make the code more readable by formatting it
          and simplifying some obfuscated patterns. Note that full deobfuscation may not be possible
          for heavily obfuscated code.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Obfuscation Settings</h2>
      <div className="space-y-4">
        {Object.entries(options).map(([key, value]) => {
          if (typeof value === 'boolean') {
            return (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={key}
                  checked={value}
                  onChange={(e) => handleChange(key as keyof ObfuscationOptions, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label htmlFor={key} className="ml-2 text-sm dark:text-gray-200">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </div>
            );
          }
          if (typeof value === 'number') {
            return (
              <div key={key} className="space-y-1">
                <label htmlFor={key} className="block text-sm dark:text-gray-200">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="number"
                  id={key}
                  value={value}
                  onChange={(e) => handleChange(key as keyof ObfuscationOptions, Number(e.target.value))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min="0"
                  max="1"
                  step="0.1"
                />
              </div>
            );
          }
          return null;
        })}
      </div>
      <button
        onClick={() => onChange(defaultOptions)}
        className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors dark:text-white"
      >
        Reset to Defaults
      </button>
    </div>
  );
};