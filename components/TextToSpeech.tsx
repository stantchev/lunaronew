"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, Square, Volume2 } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
  title: string;
}

const TextToSpeech = ({ text, title }: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const cleanTextRef = useRef<string>('');

  // Clean text once and memoize
  useEffect(() => {
    const cleanText = text
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    cleanTextRef.current = `${title}. ${cleanText}`;
  }, [text, title]);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
    
    return () => {
      // Cleanup on unmount
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlay = useCallback(() => {
    if (!isSupported || !cleanTextRef.current) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    // Cancel any existing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanTextRef.current);
    utteranceRef.current = utterance;
    
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported, isPaused]);

  const handlePause = useCallback(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  }, []);

  const handleStop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
            <Volume2 size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Listen to Article</h3>
            <p className="text-sm text-gray-600">AI-powered narration</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {!isPlaying && !isPaused && (
            <button
              onClick={handlePlay}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <Play size={16} />
              <span>Play</span>
            </button>
          )}
          
          {isPlaying && (
            <button
              onClick={handlePause}
              className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <Pause size={16} />
              <span>Pause</span>
            </button>
          )}
          
          {isPaused && (
            <button
              onClick={handlePlay}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <Play size={16} />
              <span>Resume</span>
            </button>
          )}
          
          {(isPlaying || isPaused) && (
            <button
              onClick={handleStop}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <Square size={16} />
              <span>Stop</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
