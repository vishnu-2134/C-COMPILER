import React from 'react';
import { CompilationResult } from '../types';
import { Terminal, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface OutputPanelProps {
  result: CompilationResult | null;
  isCompiling: boolean;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ result, isCompiling }) => {
  return (
    <div className="w-full h-full flex flex-col bg-[#000000] rounded-lg overflow-hidden border border-gray-800 shadow-inner">
      <div className="bg-[#1a1a1a] px-4 py-2 text-xs text-gray-400 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={14} />
          <span>Terminal Output</span>
        </div>
        {result && !isCompiling && (
            <div className="flex items-center gap-2">
                {result.isError ? (
                    <span className="text-red-400 flex items-center gap-1"><AlertCircle size={12}/> Failed</span>
                ) : (
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 size={12}/> Success</span>
                )}
                <span className="text-gray-600">|</span>
                <span className="flex items-center gap-1 text-gray-500"><Clock size={12}/> {result.executionTime}ms</span>
            </div>
        )}
      </div>
      
      <div className="flex-1 p-4 font-mono text-sm overflow-auto">
        {isCompiling ? (
            <div className="flex items-center gap-3 text-yellow-500 animate-pulse">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span>Compiling and Executing...</span>
            </div>
        ) : result ? (
          <pre className={`whitespace-pre-wrap break-words ${result.isError ? 'text-red-400' : 'text-gray-300'}`}>
            {result.output || <span className="text-gray-600 italic">Program executed successfully with no output.</span>}
          </pre>
        ) : (
          <div className="text-gray-600 italic mt-2">
            Click "Run" to compile and execute your code.
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
