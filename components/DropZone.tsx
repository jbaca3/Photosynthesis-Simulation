import React, { useState } from 'react';
import { ItemType } from '../types';

interface DropZoneProps {
  onDropItem: (type: ItemType) => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const DropZone: React.FC<DropZoneProps> = ({ onDropItem, children, className, id }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.type) {
        onDropItem(data.type);
      }
    } catch (error) {
      console.error("Failed to parse dropped data:", error);
    }
  };

  return (
    <div
      id={id}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${className} transition-all duration-300 ${isOver ? 'outline-dashed outline-4 outline-offset-[-4px] outline-black scale-105' : ''}`}
    >
      {children}
    </div>
  );
};

export default DropZone;