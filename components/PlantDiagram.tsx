import React, { useEffect } from 'react';
import DropZone from './DropZone';
import { ItemType } from '../types';
import { GlucoseIcon, O2Icon, CO2Icon, WaterIcon, SunIcon } from './Icons';

// STOMATA ZOOM-IN ANIMATION COMPONENT
interface StomataZoomAnimationProps {
  onAnimationEnd: () => void;
}
const StomataZoomAnimation: React.FC<StomataZoomAnimationProps> = ({ onAnimationEnd }) => {
  useEffect(() => {
    const timer = setTimeout(onAnimationEnd, 3000); // Animation duration
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30 p-4">
      <style>{`
        @keyframes pixel-zoomIn { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes co2-pixel-enter {
          0% { transform: translate(100px, -20px); opacity: 1; }
          100% { transform: translate(-20px, 10px) scale(0.5); opacity: 0; }
        }
        .animate-pixel-zoomIn { animation: pixel-zoomIn 0.3s steps(4, end) forwards; }
        .animate-co2-pixel-enter { animation: co2-pixel-enter 2s 0.5s linear forwards; }
      `}</style>
      <div className="w-full max-w-sm bg-[#d2b48c] border-4 border-black p-4 animate-pixel-zoomIn">
        <h3 className="text-center text-black bg-white/50 p-1 mb-4 text-xs">STOMATA</h3>
        <div className="relative w-full h-48 bg-green-300 border-2 border-black grid grid-cols-5 grid-rows-4 gap-px p-1">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`w-full h-full ${i % 3 === 0 ? 'bg-green-600' : 'bg-green-500'}`}></div>
          ))}
          {/* Stoma */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-10 bg-green-800 border-2 border-black flex items-center justify-center">
            <div className="w-10 h-4 bg-black"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 animate-co2-pixel-enter">
            <CO2Icon />
          </div>
        </div>
      </div>
    </div>
  );
};

// XYLEM ZOOM-IN ANIMATION COMPONENT
interface XylemZoomAnimationProps {
  onAnimationEnd: () => void;
}
const XylemZoomAnimation: React.FC<XylemZoomAnimationProps> = ({ onAnimationEnd }) => {
    useEffect(() => {
        const timer = setTimeout(onAnimationEnd, 3000);
        return () => clearTimeout(timer);
    }, [onAnimationEnd]);

    return (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30 p-4">
            <style>{`
                @keyframes h2o-pixel-enter {
                    0% { transform: translate(-40px, 60px); opacity: 1; }
                    40% { transform: translate(20px, 60px); opacity: 1; }
                    100% { transform: translate(20px, -100px); opacity: 1; }
                }
            `}</style>
            <div className="w-full max-w-xs bg-[#d2b48c] border-4 border-black p-4 animate-pixel-zoomIn">
                <h3 className="text-center text-black bg-white/50 p-1 mb-4 text-xs">XYLEM</h3>
                <div className="relative w-full h-64 bg-[#a1887f] border-2 border-black flex justify-center overflow-hidden">
                   {/* Xylem Tube */}
                   <div className="w-8 h-full bg-blue-200 border-x-2 border-black"></div>
                   <div className="absolute top-1/2 left-1/2 animate-h2o-pixel-enter">
                       <WaterIcon className="w-8 h-8"/>
                   </div>
                </div>
            </div>
        </div>
    );
};


interface PlantDiagramProps {
  onDropItem: (type: ItemType) => void;
  showChloroplast: boolean;
  onCloseChloroplast: () => void;
  sunlightAdded: boolean;
  showXylem: boolean;
  isComplete: boolean;
  animation: { type: ItemType | null, key: number };
  onAnimationEnd: (type: ItemType) => void;
  isAnimating: boolean;
  moleculesOnScreen: {type: ItemType, id: number}[];
}

const PlantDiagram: React.FC<PlantDiagramProps> = ({ 
  onDropItem, 
  showChloroplast, 
  onCloseChloroplast,
  sunlightAdded,
  showXylem, 
  isComplete,
  animation,
  onAnimationEnd,
  isAnimating,
  moleculesOnScreen
}) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Persistent sunlight animation */}
      {sunlightAdded && !isComplete && (
        <div className="absolute top-4 right-4 z-10">
           <style>{`
            @keyframes main-absorb-light {
              from { transform: translate(0, 0) scale(1.2); opacity: 1; }
              to { transform: translate(-180px, 60px) scale(0.5); opacity: 0; }
            }
            @keyframes main-reflect-light {
              0% { transform: translate(0, 0) scale(1.2); opacity: 1; }
              50% { transform: translate(-180px, 60px) scale(1); opacity: 1; }
              100% { transform: translate(-100px, -50px) scale(1.2); opacity: 0; }
            }
            .main-light-particle {
              position: absolute;
              width: 6px;
              height: 6px;
              border: 1px solid black;
              animation-duration: 3s;
              animation-iteration-count: infinite;
              animation-timing-function: linear;
            }
           `}</style>
          <SunIcon className="w-12 h-12" />
          <div className="absolute top-1/2 left-1/2">
            <div className="main-light-particle bg-red-500" style={{ animationName: 'main-absorb-light', animationDelay: '0s' }}></div>
            <div className="main-light-particle bg-blue-500" style={{ animationName: 'main-absorb-light', animationDelay: '0.6s' }}></div>
            <div className="main-light-particle bg-orange-400" style={{ animationName: 'main-absorb-light', animationDelay: '1.2s' }}></div>
            <div className="main-light-particle bg-violet-500" style={{ animationName: 'main-absorb-light', animationDelay: '1.8s' }}></div>
            <div className="main-light-particle bg-green-400" style={{ animationName: 'main-reflect-light', animationDelay: '0.9s' }}></div>
          </div>
        </div>
      )}

      <DropZone onDropItem={onDropItem} className={`w-full h-full p-2 flex items-center justify-center ${isAnimating ? 'pointer-events-none' : ''}`}>
        <div className="relative w-[300px] h-[450px]">
          {/* Products animation */}
          {isComplete && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-20">
                <div className="animate-bounce"><GlucoseIcon /></div>
                <div className="flex gap-4 mt-4 justify-center">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-ping" style={{ animationDelay: `${i * 100}ms` }}><O2Icon /></div>
                    ))}
                </div>
                <p className="mt-4 text-xs text-black bg-white p-2 border-2 border-black">SUCCESS!</p>
            </div>
          )}

          {/* Render collected molecules */}
          {!isComplete && (
            <>
              {/* CO2 Pile */}
              <div className="absolute top-[100px] left-[-90px] w-[80px] grid grid-cols-1 gap-y-2">
                {moleculesOnScreen
                  .filter((m) => m.type === ItemType.CO2)
                  .map((m) => (
                    <div className="flex justify-center" key={m.id}>
                      <CO2Icon />
                    </div>
                  ))}
              </div>
              {/* H2O Pile */}
              <div className="absolute bottom-[-20px] right-[-80px] w-20 grid grid-cols-2 gap-1">
                {moleculesOnScreen
                  .filter((m) => m.type === ItemType.H2O)
                  .map((m) => (
                    // FIX: Wrapped WaterIcon in a div and moved the key to the wrapper to solve a TypeScript error.
                    <div key={m.id}>
                      <WaterIcon className="w-8 h-8" />
                    </div>
                  ))}
              </div>
            </>
          )}

          {/* Pixel Plant SVG */}
          <svg viewBox="0 0 100 150" className="absolute inset-0 w-full h-full">
            {/* Ground */}
            <rect x="0" y="130" width="100" height="20" fill="#8D6E63" />
            <rect x="0" y="130" width="100" height="5" fill="#A1887F" />

            {/* Roots */}
            <g fill="#A1887F">
              <rect x="46" y="130" width="8" height="10" />
              <rect x="38" y="135" width="8" height="5" />
              <rect x="54" y="135" width="8" height="5" />
              <rect x="30" y="140" width="8" height="5" />
              <rect x="62" y="140" width="8" height="5" />
            </g>

            {/* Xylem Animation Path (simplified) */}
             <path id="stemPath" d="M 50 130 V 40" fill="none" stroke="none"/>

            {/* Stem */}
            <rect x="46" y="40" width="8" height="90" fill="#4CAF50" />
            <rect x="46" y="40" width="8" height="90" fill="rgba(0,0,0,0.1)" />

             {/* Xylem Animation */}
            {showXylem && (
              <rect width="4" height="4" fill="rgba(79, 195, 247, 0.9)">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 48 130 V 40" />
              </rect>
            )}

            {/* Leaves */}
            <g fill="#66BB6A" stroke="#388E3C" strokeWidth="2">
                {/* Left leaves */}
                <path d="M46 110 l-25 -10 l8 -8 l17 18 Z" />
                <path d="M46 90 l-20 -8 l6 -6 l14 14 Z" />
                <path d="M46 70 l-15 -6 l4 -4 l11 10 Z" />
                {/* Right leaves */}
                <path d="M54 110 l25 -10 l-8 -8 l-17 18 Z" />
                <path d="M54 90 l20 -8 l-6 -6 l-14 14 Z" />
                <path d="M54 70 l15 -6 l-4 -4 l-11 10 Z" />
            </g>

            {/* Flower */}
            <g transform="translate(50, 30)">
              <rect x="-10" y="-10" width="20" height="20" fill="#FFC107" />
              <rect x="-14" y="-6" width="28" height="12" fill="#FFC107" />
              <rect x="-6" y="-14" width="12" height="28" fill="#FFC107" />
              <rect x="-6" y="-6" width="12" height="12" fill="#795548" />
            </g>
          </svg>

          {/* Chloroplast Modal */}
          {showChloroplast && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 p-4" onClick={onCloseChloroplast}>
              <style>{`
                @keyframes absorb-light-red {
                  0% { transform: translate(-80px, -60px) scale(1); opacity: 1; }
                  100% { transform: translate(0, 0) scale(0.5); opacity: 0; }
                }
                @keyframes absorb-light-blue {
                  0% { transform: translate(80px, -60px) scale(1); opacity: 1; }
                  100% { transform: translate(0, 0) scale(0.5); opacity: 0; }
                }
                @keyframes absorb-light-orange {
                  0% { transform: translate(-60px, -80px) scale(1); opacity: 1; }
                  100% { transform: translate(0, 0) scale(0.5); opacity: 0; }
                }
                @keyframes absorb-light-violet {
                  0% { transform: translate(60px, -80px) scale(1); opacity: 1; }
                  100% { transform: translate(0, 0) scale(0.5); opacity: 0; }
                }
                @keyframes reflect-light-green {
                  0% { transform: translate(0, -100px) scale(1); opacity: 1; }
                  50% { transform: translate(0, -10px) scale(1); opacity: 1; }
                  100% { transform: translate(0, -100px) scale(1); opacity: 0; }
                }
                .light-particle {
                  position: absolute;
                  width: 8px;
                  height: 8px;
                  border: 1px solid black;
                  animation-duration: 2s;
                  animation-iteration-count: infinite;
                  animation-timing-function: linear;
                }
              `}</style>
              <div className="bg-[#f0e0d0] p-4 border-4 border-black max-w-sm text-center" onClick={e => e.stopPropagation()}>
                <h3 className="text-sm bg-white/50 p-2 border-2 border-black mb-4">CHLOROPLAST</h3>
                <p className="text-xs mb-4">Chlorophyll absorbs red, orange, blue, and violet light for energy. It reflects green light, which is why plants look green!</p>
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center border-2 border-black"></div>
                    <SunIcon className="w-12 h-12 text-yellow-300 absolute -top-4 left-1/2 -translate-x-1/2" />
                    <div className="light-particle bg-red-500" style={{ animationName: 'absorb-light-red' }}></div>
                    <div className="light-particle bg-blue-500" style={{ animationName: 'absorb-light-blue' }}></div>
                    <div className="light-particle bg-orange-400" style={{ animationName: 'absorb-light-orange' }}></div>
                    <div className="light-particle bg-violet-500" style={{ animationName: 'absorb-light-violet' }}></div>
                    <div className="light-particle bg-green-400" style={{ animationName: 'reflect-light-green', animationDelay: '0.2s' }}></div>
                </div>
                <button onClick={onCloseChloroplast} className="mt-6 bg-blue-500 text-white px-4 py-2 text-xs border-2 border-black hover:bg-blue-600">CLOSE</button>
              </div>
            </div>
          )}

          {/* ZOOM-IN ANIMATIONS */}
          {animation.type === ItemType.CO2 && <StomataZoomAnimation key={animation.key} onAnimationEnd={() => onAnimationEnd(ItemType.CO2)} />}
          {animation.type === ItemType.H2O && <XylemZoomAnimation key={animation.key} onAnimationEnd={() => onAnimationEnd(ItemType.H2O)} />}

        </div>
      </DropZone>
    </div>
  );
};

export default PlantDiagram;