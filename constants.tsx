
import React from 'react';
import { SpiralType } from './types';

export const SPIRAL_COLORS: Record<SpiralType, string> = {
  [SpiralType.Phi]: '#FFD700',
  [SpiralType.Sqrt7]: '#DC143C',
  [SpiralType.Pi]: '#808080',
};

export const CrownIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L9.26 7.37 3 8.24l4.5 4.38L6.42 19 12 15.82 17.58 19l-1.08-6.38L21 8.24l-6.26-.87L12 2zm0 4.24L13.74 10H10.26L12 6.24zM5.38 9.74l4.62.67-1.74 4.19-2.88-2.14.74-4.42zM18.62 9.74l-4.62.67 1.74 4.19 2.88-2.14-.74-4.42z"/>
    </svg>
);

export const ScepterIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a1 1 0 0 1 1 1v1.58a7 7 0 0 1 0 12.84V19a3 3 0 0 1-6 0v-1.58a7 7 0 0 1 0-12.84V3a1 1 0 0 1 1-1h4zm-1 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/>
    </svg>
);

export const GauntletIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4zm-2 13h-2v-2h2v2zm0-4h-2V8h2v4z"/>
    </svg>
);

export const ThroneIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2zm16-4h-3V7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v4H4V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4zM7 17h10v2H7v-2z"/>
    </svg>
);

export const OrbIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
        <path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3z"/>
    </svg>
);
