import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import MusicSlice, { addMusicToQueue, addMusicToQueueBulk, replaceMusicQueue } from "../store/music";
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

  const playByIndex = useCallback((index: number) => {
    dispatch(MusicSlice.actions.setCurrentPlayingIndex(index));
  }, [dispatch]);
  const addQueueBalk = useCallback((songs: {albumId: string, index: number}[]) => {
    dispatch(addMusicToQueueBulk(songs));
  }, [dispatch]);

  const replaceQueue = useCallback((songs: {albumId: string, index: number}[]) => {
    dispatch(replaceMusicQueue(songs));
  }, [dispatch]);

  const replaceQueueFromAlbum = useCallback((albumId: string, length: number, startFrom?: number) => {
    (dispatch(replaceMusicQueue(
      new Array(length)
        .fill(0)
        .map((_, i) => i)
        .map((index) => ({albumId, index: index + 1}))
    )) as any)
      .then(() => {
        if (startFrom) {
          playByIndex(startFrom);
        }
      });

  }, [dispatch, playByIndex]);

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
    replaceQueue,
    replaceQueueFromAlbum,
    currentPlaying,
    playByIndex
  }
}

export default usePlaylistManager;