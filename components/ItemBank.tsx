import React from 'react';
import DraggableItem from './DraggableItem';
import { ItemType } from '../types';
import { SunIcon, WaterIcon, CO2Icon } from './Icons';

const ItemBank: React.FC = () => {
  return (
    <div className="p-4 bg-[#f0e0d0] border-4 border-black">
      <h2 className="text-lg text-black mb-4 text-center">Reactants</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <DraggableItem type={ItemType.CO2} className="bg-gray-200 border-2 border-black hover:bg-gray-300">
          <CO2Icon />
          <span className="font-semibold mt-2 text-xs">CO2</span>
        </DraggableItem>
        <DraggableItem type={ItemType.H2O} className="bg-blue-200 border-2 border-black hover:bg-blue-300">
          <WaterIcon className="w-8 h-8" />
          <span className="font-semibold mt-2 text-xs">Water</span>
        </DraggableItem>
        <DraggableItem type={ItemType.Sunlight} className="bg-yellow-200 border-2 border-black hover:bg-yellow-300">
          <SunIcon className="w-8 h-8" />
          <span className="font-semibold mt-2 text-xs">Sunlight</span>
        </DraggableItem>
      </div>
       <p className="text-xs text-gray-600 mt-4 text-center">Drag onto the plant.</p>
    </div>
  );
};

export default ItemBank;