import React, { useState } from 'react';
import { ItemType } from './types';
import { BALANCED_EQUATION } from './constants';
import ItemBank from './components/ItemBank';
import PlantDiagram from './components/PlantDiagram';
import EquationDisplay from './components/EquationDisplay';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [counts, setCounts] = useState<{ [key in ItemType]?: number }>({});
  const [moleculesOnScreen, setMoleculesOnScreen] = useState<{type: ItemType, id: number}[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showChloroplast, setShowChloroplast] = useState(false);
  const [sunlightAdded, setSunlightAdded] = useState(false);
  const [showXylem, setShowXylem] = useState(false);
  const [animation, setAnimation] = useState<{ type: ItemType | null, key: number }>({ type: null, key: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [explanation, setExplanation] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'failure'; message: string } | null>(null);

  const handleDropItem = (type: ItemType) => {
    if (isComplete || isAnimating) return;

    if (type === ItemType.Sunlight) {
      if (!counts[ItemType.Sunlight]) {
         setShowChloroplast(true);
      }
      setCounts(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }));
      return;
    }

    if (type === ItemType.CO2 || type === ItemType.H2O) {
      const currentCount = counts[type] || 0;
      const requiredCount = BALANCED_EQUATION[type as keyof typeof BALANCED_EQUATION];
      if (currentCount >= requiredCount) {
        return; // Do not add more than required
      }

      // Student is now required to add each substance. State updates immediately on drop.
      setCounts(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }));
      setMoleculesOnScreen(prev => [...prev, { type, id: Date.now() }]);
      if(type === ItemType.H2O && !showXylem) {
        setShowXylem(true);
      }
      
      // The animation is now purely a visual effect.
      setAnimation({ type, key: Date.now() });
      setIsAnimating(true);
    }
  };
  
  const handleAnimationEnd = (type: ItemType) => {
    setIsAnimating(false);
    setAnimation({ type: null, key: 0 }); // Return to main view after animation
  };

  const handleCloseChloroplast = () => {
    setShowChloroplast(false);
    setSunlightAdded(true);
  };

  const handleBeginReaction = () => {
    const co2Met = (counts[ItemType.CO2] || 0) === BALANCED_EQUATION.CO2;
    const h2oMet = (counts[ItemType.H2O] || 0) === BALANCED_EQUATION.H2O;
    const sunlightMet = (counts[ItemType.Sunlight] || 0) > 0;

    if (co2Met && h2oMet && sunlightMet) {
        setIsComplete(true);
        setFeedback({ type: 'success', message: 'SUCCESS! The plant produced glucose and oxygen.' });
    } else {
        let errorMessage = 'FAILURE! The equation is not balanced. Check your reactants and try again.';
        if (!sunlightMet) {
            errorMessage = 'FAILURE! The plant needs sunlight to perform photosynthesis.';
        }
        setFeedback({ type: 'failure', message: errorMessage });
    }
  };
  
  const getExplanation = async () => {
    if(!process.env.API_KEY) {
      setExplanation("API_KEY is not set. Please set it in your environment to use the Gemini API.");
      return;
    }
    setIsGenerating(true);
    setExplanation('');
    try {
      const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
      const prompt = "Explain photosynthesis for a middle schooler like it's a retro video game guide. Use headings for Reactants, The Machine (Plant), and The Loot (Products). Keep it simple and fun. Use markdown.";
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text;
      
      let html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code class="bg-gray-300 p-1">$1</code>')
        .replace(/^### (.*$)/gim, '<h3 class="text-md my-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-lg my-2">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-xl my-2">$1</h1>')
        .replace(/\n/g, '<br />');

      setExplanation(html);
    } catch(error) {
      console.error(error);
      setExplanation("Error: Could not fetch explanation. The console might have more details.");
    } finally {
      setIsGenerating(false);
    }
  };

  const resetSimulation = () => {
    setCounts({});
    setMoleculesOnScreen([]);
    setIsComplete(false);
    setShowChloroplast(false);
    setSunlightAdded(false);
    setShowXylem(false);
    setAnimation({ type: null, key: 0 });
    setIsAnimating(false);
    setExplanation('');
    setFeedback(null);
  };

  return (
    <>
      <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center text-xs">
        <header className="w-full max-w-5xl text-center mb-6">
          <h1 className="text-2xl sm:text-4xl text-white" style={{ textShadow: '2px 2px #000' }}>Photosynthesis Quest</h1>
          <p className="mt-2 text-yellow-200" style={{ textShadow: '1px 1px #000' }}>Craft glucose to win!</p>
        </header>

        <main className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <ItemBank />
            <EquationDisplay counts={counts} isComplete={isComplete} />
          </div>

          <div className="lg:col-span-2 h-[500px] md:h-[600px] bg-[#a1887f]/50 border-4 border-black p-2">
            <PlantDiagram 
              onDropItem={handleDropItem} 
              showChloroplast={showChloroplast} 
              onCloseChloroplast={handleCloseChloroplast}
              sunlightAdded={sunlightAdded}
              showXylem={showXylem}
              isComplete={isComplete}
              animation={animation}
              onAnimationEnd={handleAnimationEnd}
              isAnimating={isAnimating}
              moleculesOnScreen={moleculesOnScreen}
            />
          </div>
        </main>

        <footer className="w-full max-w-5xl mt-6 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleBeginReaction}
                disabled={isAnimating || isComplete}
                className="px-4 py-3 bg-green-500 text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:bg-gray-400 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
              >
                BEGIN REACTION
              </button>
              <button
                onClick={getExplanation}
                disabled={isGenerating}
                className="px-4 py-3 bg-blue-500 text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:bg-gray-400 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
              >
                {isGenerating ? "..." : "GET HINT"}
              </button>
              <button
                onClick={resetSimulation}
                className="px-4 py-3 bg-red-500 text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                RESET
              </button>
          </div>
          {explanation && (
            <div className="mt-4 p-4 bg-[#f0e0d0] border-4 border-black w-full"
              dangerouslySetInnerHTML={{ __html: explanation }}
            />
          )}
        </footer>
      </div>

      {/* Feedback Modal */}
      {feedback && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`p-6 bg-[#f0e0d0] border-4 border-black text-center max-w-sm ${feedback.type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
            <h3 className="text-lg mb-4">{feedback.type.toUpperCase()}</h3>
            <p className="mb-6">{feedback.message}</p>
            <button
              onClick={() => setFeedback(null)}
              className="px-4 py-2 bg-gray-500 text-white border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;