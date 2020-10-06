import { useEffect, useState, MutableRefObject, useMemo, useCallback } from "react";
import usePlaylistManager from "./usePlaylistManager";

function usePlayerManager(ref: MutableRefObject<HTMLAudioElement | null>) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const {next}  = usePlaylistManager();

  const percent = useMemo(() => currentTime / duration, [duration, currentTime]);

  useEffect(() => {
    if (!ref.current) return;

    const durationChangeEvent = () => {
      ref.current && setDuration(ref.current.duration);
    }
    const currentTimeChangeEvent = () => {
      ref.current && setCurrentTime(ref.current.currentTime);
    }
    const playEvent = () => {
      ref.current && setIsPlaying(true)
    }
    const pauseEvent = () => {
      ref.current && setIsPlaying(false);
    }

    ref.current.addEventListener("durationchange", durationChangeEvent);
    ref.current.addEventListener("timeupdate", currentTimeChangeEvent);
    ref.current.addEventListener("playing", playEvent);
    ref.current.addEventListener("pause", pauseEvent);
    ref.current.addEventListener("ended", next);

    durationChangeEvent();
    currentTimeChangeEvent();

    const current = ref.current;
    return () => {
      if (!current) return;
      current.removeEventListener("durationchange", durationChangeEvent);
      current.removeEventListener("timeupdate", currentTimeChangeEvent);
      current.removeEventListener("playing", playEvent);
      current.removeEventListener("ended", next);
      current.removeEventListener("pause", pauseEvent);
    }
  }, [ref, next]);

  const pauseOrPlay = useCallback(() => {
    if (!ref.current) return;
    if (ref.current.paused) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [ref]);
  const seekByRatio = useCallback((ratio: number) => {
    if (!ref.current) return;

    ref.current.currentTime = ref.current.duration * ratio;
  }, [ref]);
  function formatTime(sec: number) {
    let time = Math.round(sec);
    let texts = [];

    do {
      texts.push(time % 60);
      time /= 60;
      time = Math.floor(time);
    } while (time >= 60);
    texts.push(time);

    if (texts.length < 2) {
      texts.push("00");
    }

    return texts.reverse().map(num => typeof num === "number" && num < 10 ? "0" + num : num).join(":");
  }

  return {
    player: ref.current,
    duration,
    currentTime,
    percent,
    isPlaying,
    formatTime,
    seekByRatio,
    pauseOrPlay,
  };
}



export default usePlayerManager;