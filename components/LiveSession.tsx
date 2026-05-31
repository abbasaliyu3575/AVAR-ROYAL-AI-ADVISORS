
import React, { useState, useEffect, useRef } from 'react';
import { connectToLiveBridge, Persona } from '../services/geminiService';
import { LiveServerMessage, Blob } from '@google/genai';
import { PERSONAS, getThemeColors } from '../constants';

const LiveSession: React.FC = () => {
  const [persona, setPersona] = useState<Persona>('Aurora');
  const [isActive, setIsActive] = useState(false);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const currentPersona = PERSONAS.find(p => p.id === persona) || PERSONAS[0];
  const theme = getThemeColors(currentPersona.color);
  
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Helper: Decode base64 to Uint8Array (required for raw PCM stream)
  const decodeBase64 = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  // Helper: Decode raw PCM audio data into AudioBuffer
  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  // Helper: Encode Uint8Array to base64
  const encodeBase64 = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const createBlob = (data: Float32Array): Blob => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encodeBase64(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  const stopSession = () => {
    if (sessionPromiseRef.current) {
      sessionPromiseRef.current.then(session => session.close());
      sessionPromiseRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    setIsActive(false);
  };

  const startSession = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      inputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
      
      const callbacks = {
        onopen: () => {
          setIsActive(true);
          setError(null);
          
          if (inputAudioContextRef.current && streamRef.current) {
            const source = inputAudioContextRef.current.createMediaStreamSource(streamRef.current);
            const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              
              if (sessionPromiseRef.current) {
                sessionPromiseRef.current.then((session) => {
                  session.sendRealtimeInput({ media: pcmBlob });
                });
              }
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current.destination);
          }
        },
        onmessage: async (message: LiveServerMessage) => {
          if (message.serverContent?.outputTranscription) {
            setTranscripts(prev => [...prev, `${currentPersona.label}: ${message.serverContent.outputTranscription.text}`]);
          }
          if (message.serverContent?.inputTranscription) {
            setTranscripts(prev => [...prev, `Aba: ${message.serverContent.inputTranscription.text}`]);
          }

          const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64Audio && outputAudioContextRef.current) {
            const ctx = outputAudioContextRef.current;
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
            
            const audioBuffer = await decodeAudioData(
              decodeBase64(base64Audio),
              ctx,
              24000,
              1
            );
            
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            source.addEventListener('ended', () => {
              sourcesRef.current.delete(source);
            });
            
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            sourcesRef.current.add(source);
          }

          if (message.serverContent?.interrupted) {
            sourcesRef.current.forEach(source => {
              try { source.stop(); } catch(e) {}
            });
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
          }
        },
        onerror: (e: any) => {
          console.error("Live session error:", e);
          setError("AVAR bridge disrupted. Security protocols triggered.");
          setIsActive(false);
        },
        onclose: () => {
          setIsActive(false);
        }
      };

      sessionPromiseRef.current = connectToLiveBridge(callbacks, persona);
    } catch (err) {
      console.error("Failed to start session:", err);
      setError("Failed to initialize AVAR audio capture. Check permissions.");
    }
  };

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  return (
    <div className="space-y-8 pb-10">
      {/* Royal Persona Selector */}
      <div className="glass-card p-2 overflow-x-auto bg-slate-900/80 border border-slate-800 rounded-2xl flex space-x-2 scrollbar-none">
        {PERSONAS.map((p) => {
          const pTheme = getThemeColors(p.color);
          return (
            <button
              key={p.id}
              onClick={() => setPersona(p.id)}
              disabled={isActive}
              className={`px-4 py-2 rounded-xl whitespace-nowrap text-[10px] font-bold uppercase transition-all flex items-center space-x-2 ${
                persona === p.id 
                  ? `${pTheme.bg} text-white shadow-lg` 
                  : 'bg-slate-800 text-slate-500 hover:bg-slate-700 opacity-60'
              }`}
            >
              <i className={`fa-solid ${p.icon}`}></i>
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      <div className={`glass-card p-10 rounded-3xl text-center border-2 sovereign-glow transition-all duration-500 ${theme.border}`}>
        <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-8 border-4 transition-all duration-500 ${
          isActive 
            ? `${theme.border} shadow-lg shadow-indigo-500/20` 
            : 'border-slate-800'
        }`}>
          <i className={`fa-solid ${isActive ? 'fa-microphone-lines' : 'fa-microphone'} text-5xl transition-colors duration-500 ${
            isActive ? theme.text : 'text-slate-600'
          }`}></i>
        </div>

        <h3 className="text-2xl font-bold mb-4 uppercase tracking-widest gold-text">
          {currentPersona.label} Bridge
        </h3>
        <p className="text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed text-sm">
          Node: <span className={`${theme.text} font-bold`}>{currentPersona.role}</span>. 
          Establish a priority neural link with {currentPersona.label} for absolute sovereign synchronization.
        </p>

        <div className="flex justify-center space-x-4">
          {!isActive ? (
            <button
              onClick={startSession}
              className={`px-10 py-4 text-white font-bold rounded-2xl flex items-center transition-all shadow-xl ${theme.bg} hover:opacity-80 ${theme.shadow}`}
            >
              <i className="fa-solid fa-plug mr-3"></i>
              INITIALIZE {persona.toUpperCase()} LINK
            </button>
          ) : (
            <button
              onClick={stopSession}
              className="px-10 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl flex items-center transition-all shadow-xl shadow-red-600/20"
            >
              <i className="fa-solid fa-plug-circle-xmark mr-3"></i>
              TERMINATE LINK
            </button>
          )}
        </div>
        {error && <p className="mt-6 text-red-500 font-mono text-[10px] uppercase">{error}</p>}
      </div>

      <div className={`glass-card rounded-3xl p-6 min-h-[200px] bg-slate-900/50 border ${theme.border}`}>
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">
          {currentPersona.label} Session Transcript
        </h4>
        <div className="space-y-2 max-h-60 overflow-y-auto font-mono text-sm">
          {transcripts.length === 0 && (
            <p className="text-slate-600 italic text-[10px] uppercase">No communication detected on this frequency...</p>
          )}
          {transcripts.map((t, i) => (
            <p key={i} className={t.startsWith('Aba:') ? `${theme.text} font-bold` : 'text-slate-200'}>{t}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveSession;
