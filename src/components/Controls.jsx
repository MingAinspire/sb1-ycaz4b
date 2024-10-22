import React, { useState } from 'react';

const FREQUENCY_PAIRS = {
  60: 528,
  528: 60,
  432: 444,
  444: 432,
  852: 741,
  741: 852,
  396: 174,
  174: 396
};

export default function Controls({ 
  onPatternChange, 
  onFrequencyChange,
  onSecondaryFrequencyChange,
  onWaveformChange,
  onSpeedChange,
  onAnimationSpeedChange,
  onPrimaryVolumeChange,
  onSecondaryVolumeChange,
  onPlayToggle,
  isPlaying,
  primaryVolume,
  secondaryVolume,
  secondaryFrequency,
  activePattern,
  activeFrequency,
  waveform,
  rotationSpeed,
  animationSpeed
}) {
  const [isPaired, setIsPaired] = useState(false);

  const patterns = [
    { id: 'hexagon', name: 'Hexagon' },
    { id: 'spiral', name: 'Spiral' },
    { id: 'lotus', name: 'Lotus' },
    { id: 'merkaba', name: 'Merkaba' },
    { id: 'circles', name: 'Circles' }
  ];

  const frequencies = [
    { value: 60, name: '60 Hz - Shielding' },
    { value: 174, name: '174 Hz - Pain Relief' },
    { value: 396, name: '396 Hz - Fear Release' },
    { value: 432, name: '432 Hz - Nature' },
    { value: 444, name: '444 Hz - Emotional Balance' },
    { value: 528, name: '528 Hz - Healing' },
    { value: 741, name: '741 Hz - Intuition' },
    { value: 852, name: '852 Hz - Psychic Clarity' }
  ];

  const waveforms = [
    { value: 'sine', name: 'Sine Wave' },
    { value: 'triangle', name: 'Triangle Wave' },
    { value: 'square', name: 'Square Wave' },
  ];

  const speeds = [
    { value: 5000, name: 'Fast' },
    { value: 10000, name: 'Normal' },
    { value: 15000, name: 'Slow' },
  ];

  const handlePrimaryFrequencyChange = (e) => {
    const newFreq = Number(e.target.value);
    onFrequencyChange(newFreq);
    if (isPaired) {
      onSecondaryFrequencyChange(FREQUENCY_PAIRS[newFreq] || null);
    }
  };

  const handlePairToggle = () => {
    setIsPaired(!isPaired);
    if (!isPaired) {
      onSecondaryFrequencyChange(FREQUENCY_PAIRS[activeFrequency] || null);
    } else {
      onSecondaryFrequencyChange(null);
    }
  };

  const baseSelectClass = `
    w-full bg-gray-900/50 rounded-lg px-4 py-3
    border border-gray-700/50 
    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
    text-white shadow-sm
    transition-all duration-200
  `;

  const baseSliderClass = `
    w-full h-2 rounded-lg appearance-none cursor-pointer
    bg-gray-700/50
    accent-indigo-500
    focus:outline-none focus:ring-2 focus:ring-indigo-500/20
  `;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Pattern</label>
          <select 
            value={activePattern}
            onChange={(e) => onPatternChange(e.target.value)}
            className={baseSelectClass}
          >
            {patterns.map(pattern => (
              <option key={pattern.id} value={pattern.id}>
                {pattern.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Primary Frequency</label>
          <select 
            value={activeFrequency}
            onChange={handlePrimaryFrequencyChange}
            className={baseSelectClass}
          >
            {frequencies.map(freq => (
              <option key={freq.value} value={freq.value}>
                {freq.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Paired Frequency</label>
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePairToggle}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300
                ${isPaired 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500' 
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                }`}
            >
              {isPaired ? 'Unpair' : 'Enable Pairing'}
            </button>
            {isPaired && FREQUENCY_PAIRS[activeFrequency] && (
              <div className={`${baseSelectClass} bg-gray-800/50`}>
                {frequencies.find(f => f.value === FREQUENCY_PAIRS[activeFrequency])?.name}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Waveform</label>
          <select 
            value={waveform}
            onChange={(e) => onWaveformChange(e.target.value)}
            className={baseSelectClass}
          >
            {waveforms.map(wave => (
              <option key={wave.value} value={wave.value}>
                {wave.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Pattern Speed</label>
          <select 
            value={rotationSpeed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className={baseSelectClass}
          >
            {speeds.map(speed => (
              <option key={speed.value} value={speed.value}>
                {speed.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">
          Animation Speed ({Math.round((animationSpeed / 10) * 100)}%)
        </label>
        <input
          type="range"
          min="1"
          max="20"
          value={animationSpeed}
          onChange={(e) => onAnimationSpeedChange(Number(e.target.value))}
          className={baseSliderClass}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-700/30">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Primary Volume ({Math.round(primaryVolume * 100)}%)
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={primaryVolume}
            onChange={(e) => onPrimaryVolumeChange(Number(e.target.value))}
            className={baseSliderClass}
          />
        </div>

        {isPaired && secondaryFrequency && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Secondary Volume ({Math.round(secondaryVolume * 100)}%)
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={secondaryVolume}
              onChange={(e) => onSecondaryVolumeChange(Number(e.target.value))}
              className={baseSliderClass}
              disabled={!isPaired}
            />
          </div>
        )}
      </div>

      <button
        onClick={onPlayToggle}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 
                 text-white px-8 py-4 rounded-xl font-bold shadow-lg 
                 transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98]
                 focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPlaying ? 'Pause Session' : 'Start Session'}
      </button>
    </div>
  );
}