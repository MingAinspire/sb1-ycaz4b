import React, { useState } from 'react';
import FrequencyPlayer from './components/FrequencyPlayer';
import GeometricVisualizer from './components/GeometricVisualizer';
import WaveformVisualizer from './components/WaveformVisualizer';
import Timer from './components/Timer';
import Controls from './components/Controls';

export default function App() {
  const [activePattern, setActivePattern] = useState('hexagon');
  const [activeFrequency, setActiveFrequency] = useState(432);
  const [secondaryFrequency, setSecondaryFrequency] = useState(444);
  const [waveform, setWaveform] = useState('sine');
  const [rotationSpeed, setRotationSpeed] = useState(10000);
  const [animationSpeed, setAnimationSpeed] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [primaryVolume, setPrimaryVolume] = useState(0.5);
  const [secondaryVolume, setSecondaryVolume] = useState(0.5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Meditation & Visualization
          </h1>
          <p className="text-gray-400">Harmonize your mind with sacred frequencies</p>
        </header>
        
        <div className="grid gap-8">
          <section className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700/30">
            <GeometricVisualizer 
              pattern={activePattern}
              isPlaying={isPlaying}
              frequency={activeFrequency}
              secondaryFrequency={secondaryFrequency}
              rotationSpeed={rotationSpeed}
              animationSpeed={animationSpeed}
            />
          </section>

          <section className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700/30">
            <WaveformVisualizer 
              primaryFrequency={activeFrequency}
              secondaryFrequency={secondaryFrequency}
              isPlaying={isPlaying}
              primaryVolume={primaryVolume}
              secondaryVolume={secondaryVolume}
              animationSpeed={animationSpeed}
            />
          </section>
          
          <FrequencyPlayer 
            frequency={activeFrequency}
            secondaryFrequency={secondaryFrequency}
            waveform={waveform}
            isPlaying={isPlaying}
            primaryVolume={primaryVolume}
            secondaryVolume={secondaryVolume}
          />
          
          <section className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700/30">
            <Timer isPlaying={isPlaying} />
          </section>
          
          <section className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700/30">
            <Controls 
              onPatternChange={setActivePattern}
              onFrequencyChange={setActiveFrequency}
              onSecondaryFrequencyChange={setSecondaryFrequency}
              onWaveformChange={setWaveform}
              onSpeedChange={setRotationSpeed}
              onAnimationSpeedChange={setAnimationSpeed}
              onPrimaryVolumeChange={setPrimaryVolume}
              onSecondaryVolumeChange={setSecondaryVolume}
              onPlayToggle={() => setIsPlaying(!isPlaying)}
              isPlaying={isPlaying}
              primaryVolume={primaryVolume}
              secondaryVolume={secondaryVolume}
              secondaryFrequency={secondaryFrequency}
              activePattern={activePattern}
              activeFrequency={activeFrequency}
              waveform={waveform}
              rotationSpeed={rotationSpeed}
              animationSpeed={animationSpeed}
            />
          </section>
        </div>
      </div>
    </div>
  );
}