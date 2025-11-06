import React from 'react';

export const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="2" width="4" height="4" fill="#FFD700"/>
    <rect x="18" y="4" width="4" height="4" fill="#FFD700"/>
    <rect x="2" y="10" width="4" height="4" fill="#FFD700"/>
    <rect x="10" y="18" width="4" height="4" fill="#FFD700"/>
    <rect x="4" y="18" width="4" height="4" fill="#FFD700"/>
    <rect x="16" y="16" width="4" height="4" fill="#FFD700"/>
    <rect x="4" y="4" width="4" height="4" fill="#FFD700"/>
    <rect x="6" y="6" width="12" height="12" fill="#FFD700"/>
    <rect x="8" y="8" width="8" height="8" fill="#FFFACD"/>
  </svg>
);

export const WaterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14 2V4H10V2H12ZM10 4L16 4V6H8V4H10ZM8 6L18 6V8H6V6H8ZM6 8L18 8V14H6V8ZM6 14L16 14V16H8V14ZM8 16L14 16V18H10V16H8ZM10 18H12V22H10V18Z" fill="#4FC3F7"/>
    <path d="M12 4L14 4V6H10V4H12ZM10 6L16 6V8H8V6H10ZM8 8L16 8V12H8V8Z" fill="#81D4FA"/>
  </svg>
);

export const CO2Icon = () => (
    <div className="flex items-center justify-center gap-1 font-bold text-xs" style={{ fontFamily: 'monospace' }}>
        <span className="w-6 h-6 bg-red-500 border border-black flex items-center justify-center text-white">O</span>
        <span className="w-6 h-6 bg-gray-700 border border-black flex items-center justify-center text-white">C</span>
        <span className="w-6 h-6 bg-red-500 border border-black flex items-center justify-center text-white">O</span>
    </div>
);

export const O2Icon = () => (
    <div className="flex items-center justify-center gap-1 font-bold text-xs" style={{ fontFamily: 'monospace' }}>
        <span className="w-6 h-6 bg-red-500 border border-black flex items-center justify-center text-white">O</span>
        <span className="w-6 h-6 bg-red-500 border border-black flex items-center justify-center text-white">O</span>
    </div>
);

export const GlucoseIcon = () => (
    <div className="relative w-12 h-12 flex items-center justify-center">
        <svg viewBox="0 0 48 48" className="w-full h-full">
            <path d="M24 4L36 12V36L24 44L12 36V12L24 4Z" fill="#66BB6A" stroke="#1B5E20" strokeWidth="3" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-[8px] leading-tight text-center">C₆H₁₂O₆</div>
    </div>
);