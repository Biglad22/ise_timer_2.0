import { useCallback, useEffect, useRef, useState } from "react";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function useCounterDown(initialMinutes: number) {
  const initialSecondsRef = useRef(
    Math.max(0, Math.floor(initialMinutes * 60)),
  );
  const [secondsLeft, setSecondsLeft] = useState(initialSecondsRef.current);
  const intervalRef = useRef<number | null>(null);
  const [isCounting, setIsCounting] = useState<boolean>(false);

  useEffect(() => {
    const secs = Math.max(0, Math.floor(initialMinutes * 60));
    initialSecondsRef.current = secs;
    setSecondsLeft(secs);
  }, [initialMinutes]);

  const stop = useCallback(() => {
    if (isCounting) setIsCounting(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setSecondsLeft(initialSecondsRef.current);
  }, []);

  const tick = useCallback(() => {
    setSecondsLeft((prev) => {
      if (prev <= 1) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsCounting(false);
        }
        return 0;
      }
      return prev - 1;
    });
  }, []);

  const start = useCallback(
    (options?: { restart: boolean }) => {
      if (options?.restart) stop();
      setSecondsLeft(initialSecondsRef.current);
      setIsCounting(true);
      intervalRef.current = window.setInterval(tick, 1000);
    },
    [stop, tick],
  );

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const time = `${pad(minutes)}:${pad(seconds)}`;

  return { time, isCounting, start, stop };
}
