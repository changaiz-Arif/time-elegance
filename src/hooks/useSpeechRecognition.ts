import { useCallback, useEffect, useRef, useState } from "react";

type SR = any;

function getSpeechRecognition(): any | null {
  if (typeof window === "undefined") return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

export function isSpeechRecognitionSupported() {
  return getSpeechRecognition() !== null;
}

export function useSpeechRecognition(onResult: (text: string, isFinal: boolean) => void) {
  const recRef = useRef<SR | null>(null);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supported = isSpeechRecognitionSupported();
  const cbRef = useRef(onResult);
  useEffect(() => { cbRef.current = onResult; }, [onResult]);

  const stop = useCallback(() => {
    try { recRef.current?.stop(); } catch {}
    setListening(false);
  }, []);

  const start = useCallback(() => {
    setError(null);
    const Ctor = getSpeechRecognition();
    if (!Ctor) { setError("Speech recognition is not supported in this browser."); return; }
    try {
      const rec = new Ctor();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = navigator.language || "en-US";
      rec.onresult = (e: any) => {
        let interim = "";
        let finalText = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const r = e.results[i];
          if (r.isFinal) finalText += r[0].transcript;
          else interim += r[0].transcript;
        }
        if (finalText) cbRef.current(finalText, true);
        else if (interim) cbRef.current(interim, false);
      };
      rec.onerror = (e: any) => {
        setError(e?.error || "Speech recognition error");
        setListening(false);
      };
      rec.onend = () => setListening(false);
      recRef.current = rec;
      rec.start();
      setListening(true);
    } catch (err: any) {
      setError(err?.message || "Could not start recognition");
      setListening(false);
    }
  }, []);

  useEffect(() => () => { try { recRef.current?.abort(); } catch {} }, []);

  return { start, stop, listening, error, supported };
}