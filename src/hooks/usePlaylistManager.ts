import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import MusicSlice, { addMusicToQueue, addMusicToQueueBulk } from "../store/music";
import { RootState } from "../store";

function usePlaylistManager() {
  const dispatch = useDispatch();
  const { currentPlayingIndex,queue } = useSelector((state: RootState) => state.music);

  const addQueue = useCallback((albumId: string, index: number) => {
    dispatch(addMusicToQueue({
      albumId,
      index
    }))
  }, [dispatch]);

  const addQueueBalk = useCallback((songs: {albumId: string, index: number}[]) => {
    dispatch(addMusicToQueueBulk(songs));
  }, [dispatch]);

  const next = useCallback(() => dispatch(MusicSlice.actions.next()), [dispatch]);
  const prev = useCallback(() => dispatch(MusicSlice.actions.prev()), [dispatch]);
  const currentPlaying = useMemo(() => currentPlayingIndex !== undefined ? queue[currentPlayingIndex] : undefined, [currentPlayingIndex, queue]);
  return {
    addQueue,
    addQueueBalk,
    currentPlayingIndex,
    next,
    prev,
    queue,
    currentPlaying

  }
}

export default usePlaylistManager;