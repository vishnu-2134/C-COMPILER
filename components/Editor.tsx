import React, { useCallback } from 'react';

interface EditorProps {
  code: string;
  onChange: (newCode: string) => void;
}

const Editor: React.FC<EditorProps> = ({ code, onChange }) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      // Insert 4 spaces for tab
      const newValue = code.substring(0, start) + "    " + code.substring(end);
      onChange(newValue);

      // Restore selection position (async to wait for render)
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  }, [code, onChange]);

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-800">
      <div className="bg-[#252526] px-4 py-2 text-xs text-gray-400 border-b border-gray-800 flex items-center justify-between">
        <span>main.c</span>
        <span>UTF-8</span>
      </div>
      <div className="relative flex-1 w-full h-full">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="w-full h-full p-4 bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm resize-none focus:outline-none leading-6"
          placeholder="// Type your C code here..."
        />
      </div>
    </div>
  );
};

export default Editor;
