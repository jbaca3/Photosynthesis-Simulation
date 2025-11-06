import React from 'react';
import { ItemType } from '../types';

interface DraggableItemProps {
  type: ItemType;
  children: React.ReactNode;
  className?: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ type, children, className }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ type }));
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`p-2 cursor-grab active:cursor-grabbing transition-all duration-150 flex flex-col items-center justify-center text-center ${className}`}
    >
      {children}
    </div>
  );
};

export default DraggableItem;