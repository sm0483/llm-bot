import React from 'react';


function MessageContent({ text, avatar, timestamp }) {
  return (
    <div className="flex-1">
      <p className="text-sm text-gray-800 mb-1 line-clamp-1">
        {text}
      </p>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{avatar}</span>
        <span>{timestamp}</span>
      </div>
    </div>
  );
}

export default MessageContent;