'use client';

import dynamic from 'next/dynamic';

// Dynamically import the 3D Zigzag Brochure component to ensure 100% client-side WebGL rendering
const ZigzagBrochure = dynamic(() => import('@/components/ZigzagBrochure'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-pink-500/20 animate-ping" />
        <div className="absolute inset-0 rounded-full border-4 border-t-pink-500 border-r-pink-400 border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p className="text-sm font-semibold tracking-wider text-pink-300 uppercase">
        Loading 3D ICT Classroom & Zigzag Brochure...
      </p>
      <span className="text-xs text-slate-400">
        Rendering high-resolution textures & physics hinges
      </span>
    </div>
  ),
});

export default function Home() {
  return (
    <main
      className="w-full h-screen overflow-hidden bg-slate-950"
      style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', position: 'relative' }}
    >
      <ZigzagBrochure />
    </main>
  );
}
