import React from 'react';
import { ItemType } from '../types';
import { BALANCED_EQUATION } from '../constants';
import { CO2Icon, WaterIcon, SunIcon, GlucoseIcon, O2Icon } from './Icons';

interface EquationDisplayProps {
  counts: { [key in ItemType]?: number };
  isComplete: boolean;
}

const EquationItem: React.FC<{
  current: number;
  required: number;
  Icon: React.ElementType;
  label: string;
  isProduct?: boolean;
  isComplete: boolean;
}> = ({ current, required, Icon, label, isProduct, isComplete }) => {
  const isSatisfied = isProduct ? isComplete : current >= required;
  const bgClass = isSatisfied ? 'bg-green-300' : 'bg-gray-200';

  return (
    <div className={`flex flex-col items-center justify-center text-center p-1 border-2 border-black w-20 h-24 ${bgClass}`}>
      <div className="relative h-10 flex items-center justify-center">
        <Icon />
      </div>
      <span className="text-[10px] font-semibold mt-2">{label}</span>
    </div>
  );
};

const EquationDisplay: React.FC<EquationDisplayProps> = ({ counts, isComplete }) => {
  const sunlightPresent = (counts[ItemType.Sunlight] || 0) > 0;

  return (
    <div className="p-4 bg-[#f0e0d0] border-4 border-black w-full">
      <h2 className="text-lg text-black mb-4 text-center">Equation</h2>
      <div className="flex items-center justify-center flex-wrap gap-1">
        {/* Reactants */}
        <EquationItem current={counts.CO2 || 0} required={BALANCED_EQUATION.CO2} Icon={CO2Icon} label="CO₂" isComplete={isComplete} isProduct={false} />
        <span className="text-2xl font-bold mx-1">+</span>
        <EquationItem current={counts.H2O || 0} required={BALANCED_EQUATION.H2O} Icon={() => <WaterIcon className="w-8 h-8" />} label="H₂O" isComplete={isComplete} isProduct={false}/>
        
        {/* Arrow and Sunlight */}
        <div className="w-full md:w-auto flex flex-col items-center justify-center my-2 md:my-0 md:mx-2">
            <div className={`p-1 border-2 border-black mb-1 ${sunlightPresent ? 'bg-yellow-300' : 'bg-gray-200'}`}>
                <SunIcon className="w-6 h-6"/>
            </div>
            <div className="text-2xl font-bold text-green-800 transform rotate-90 md:rotate-0">→</div>
        </div>

        {/* Products */}
        <EquationItem current={0} required={BALANCED_EQUATION.Glucose} Icon={GlucoseIcon} label="C₆H₁₂O₆" isProduct={true} isComplete={isComplete}/>
        <span className="text-2xl font-bold mx-1">+</span>
        <EquationItem current={0} required={BALANCED_EQUATION.O2} Icon={O2Icon} label="6 O₂" isProduct={true} isComplete={isComplete}/>
      </div>
    </div>
  );
};

export default EquationDisplay;