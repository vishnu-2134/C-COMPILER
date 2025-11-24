import React from 'react';

interface InputPanelProps {
  input: string;
  onChange: (val: string) => void;
  isOpen: boolean;
  toggle: () => void;
}

const InputPanel: React.FC<InputPanelProps> = ({ input, onChange, isOpen, toggle }) => {
  if (!isOpen) return null;

  return (
    <div className="h-32 flex flex-col bg-[#1e1e1e] border-t border-gray-800">
       <div className="bg-[#252526] px-4 py-1 text-xs text-gray-400 flex justify-between items-center">
         <span>Standard Input (stdin)</span>
         <button onClick={toggle} className="hover:text-white">Close</button>
       </div>
       <textarea
        value={input}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-[#1e1e1e] text-[#d4d4d4] p-3 font-mono text-sm resize-none focus:outline-none border-none"
        placeholder="Enter input for your program here..."
       />
    </div>
  );
};

export default InputPanel;
