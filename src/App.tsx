import React, { useState, useCallback } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { SettingsPanel } from './components/SettingsPanel';
import { javascriptPlugin } from './plugins/javascript';
import type { ObfuscationOptions, TransformMode } from './types';
import { Copy, Upload, Download, Play, Repeat } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [inputCode, setInputCode] = useState('// Enter your JavaScript code here');
  const [outputCode, setOutputCode] = useState('');
  const [options, setOptions] = useState<ObfuscationOptions>(javascriptPlugin.defaultOptions);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<TransformMode>('obfuscate');

  const handleTransform = useCallback(async () => {
    try {
      setIsProcessing(true);
      const result = await javascriptPlugin.transform(inputCode, options, mode);
      setOutputCode(result);
      toast.success(`Code ${mode === 'obfuscate' ? 'obfuscated' : 'deobfuscated'} successfully!`);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  }, [inputCode, options, mode]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(outputCode);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  }, [outputCode]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputCode(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  }, []);

  const handleDownload = useCallback(() => {
    const blob = new Blob([outputCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transformed.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [outputCode]);

  const toggleMode = useCallback(() => {
    setMode(prev => prev === 'obfuscate' ? 'deobfuscate' : 'obfuscate');
  }, []);

  return (
    <div className="min-h-screen dark bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Code Transformer</h1>
          <button
            onClick={toggleMode}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Repeat className="w-4 h-4 mr-2" />
            {mode === 'obfuscate' ? 'Switch to Deobfuscate' : 'Switch to Obfuscate'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Input</h2>
                <div className="space-x-2">
                  <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    <Upload className="w-4 h-4 inline-block mr-2" />
                    Upload
                    <input
                      type="file"
                      accept=".js,.ts"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <CodeEditor
                value={inputCode}
                onChange={setInputCode}
                darkMode={true}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Output</h2>
                <div className="space-x-2">
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    <Copy className="w-4 h-4 inline-block mr-2" />
                    Copy
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    disabled={!outputCode}
                  >
                    <Download className="w-4 h-4 inline-block mr-2" />
                    Download
                  </button>
                </div>
              </div>
              <CodeEditor
                value={outputCode}
                readOnly
                darkMode={true}
              />
            </div>

            <button
              onClick={handleTransform}
              disabled={isProcessing}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center"
            >
              <Play className="w-4 h-4 mr-2" />
              {isProcessing ? 'Processing...' : mode === 'obfuscate' ? 'Obfuscate Code' : 'Deobfuscate Code'}
            </button>
          </div>

          <div>
            <SettingsPanel 
              options={options} 
              onChange={setOptions} 
              mode={mode}
            />
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-400">
          <p>
            Designed by <a href="https://github.com/RGB-Outl4w" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">OutlawRGB</a>. 
            Created by <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">bolt</a>.
          </p>
        </footer>
      </div>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#374151',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App;