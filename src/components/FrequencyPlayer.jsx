import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';

export default function FrequencyPlayer({ 
  frequency, 
  secondaryFrequency, 
  isPlaying, 
  waveform = "sine",
  primaryVolume = 0.5,
  secondaryVolume = 0.5
}) {
  const primaryOscRef = useRef(null);
  const secondaryOscRef = useRef(null);
  const primaryGainRef = useRef(null);
  const secondaryGainRef = useRef(null);

  useEffect(() => {
    primaryGainRef.current = new Tone.Gain(0).toDestination();
    secondaryGainRef.current = new Tone.Gain(0).toDestination();

    primaryOscRef.current = new Tone.Oscillator({
      frequency,
      type: waveform,
    }).connect(primaryGainRef.current);

    if (secondaryFrequency) {
      secondaryOscRef.current = new Tone.Oscillator({
        frequency: secondaryFrequency,
        type: waveform,
      }).connect(secondaryGainRef.current);
    }

    return () => {
      primaryOscRef.current?.dispose();
      secondaryOscRef.current?.dispose();
      primaryGainRef.current?.dispose();
      secondaryGainRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (primaryOscRef.current) {
      primaryOscRef.current.frequency.value = frequency;
    }
    if (secondaryOscRef.current && secondaryFrequency) {
      secondaryOscRef.current.frequency.value = secondaryFrequency;
    }
  }, [frequency, secondaryFrequency]);

  useEffect(() => {
    if (primaryOscRef.current) {
      primaryOscRef.current.type = waveform;
    }
    if (secondaryOscRef.current) {
      secondaryOscRef.current.type = waveform;
    }
  }, [waveform]);

  useEffect(() => {
    if (primaryGainRef.current) {
      primaryGainRef.current.gain.rampTo(isPlaying ? primaryVolume : 0, 0.1);
    }
    if (secondaryGainRef.current) {
      secondaryGainRef.current.gain.rampTo(
        isPlaying && secondaryFrequency ? secondaryVolume : 0, 
        0.1
      );
    }
  }, [isPlaying, primaryVolume, secondaryVolume, secondaryFrequency]);

  useEffect(() => {
    const startAudio = async () => {
      if (isPlaying) {
        await Tone.start();
        primaryOscRef.current?.start();
        secondaryOscRef.current?.start();
      }
    };
    
    startAudio();
    
    return () => {
      primaryOscRef.current?.stop();
      secondaryOscRef.current?.stop();
    };
  }, [isPlaying]);

  return null;
}