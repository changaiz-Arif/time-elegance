import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

type Props = {
  onFinalText: (text: string) => void;
  onInterim?: (text: string) => void;
};

export function VoiceRecorder({ onFinalText, onInterim }: Props) {
  const { start, stop, listening, error, supported } = useSpeechRecognition((text, isFinal) => {
    if (isFinal) onFinalText(text);
    else onInterim?.(text);
  });

  useEffect(() => {
    if (error) toast.error(`Voice input: ${error}`);
  }, [error]);

  if (!supported) {
    return (
      <button
        type="button"
        disabled
        title="Voice input not supported in this browser"
        aria-label="Voice input not supported"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground/60"
      >
        <MicOff className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={listening ? "Stop recording" : "Start voice input"}
      onClick={() => (listening ? stop() : start())}
      className={`relative inline-flex h-8 w-8 items-center justify-center rounded-full transition ${
        listening ? "bg-red-500 text-white" : "hover:bg-black/5 dark:hover:bg-white/10"
      }`}
    >
      <Mic className="h-4 w-4" />
      <AnimatePresence>
        {listening && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full bg-red-500/40"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <motion.span
              className="absolute inset-0 rounded-full bg-red-500/30"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
            />
          </>
        )}
      </AnimatePresence>
    </button>
  );
}