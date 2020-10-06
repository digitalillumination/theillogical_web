import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getClient from "../lib/client";
import { toast } from "react-toastify";

interface Music {
  albumId: string,
  index: number,
  isFetching: boolean,
  data?: {
    albumTitle: string,
    albumImage: string,
    title: string,
    by: {
      _id: string,
      username: string,
      profile_image: string
    }
  }
}

interface MusicState {
  queue: Music[],
  currentPlayingIndex?: number
}

const initialState: MusicState = {
  queue: [],
};

export const addMusicToQueue = createAsyncThunk("music/ADD_MUSIC_TO_QUEUE",  ({albumId, index}: {albumId: string, index: number}) => {
  return getClient().get(`/api/v1/album/${albumId}/${index}`)
    .then(({data: {data}}) => {
      toast.success("1곡이 추가되었습니다.");
      return ({ ...data, index });
    })
    .catch(e => {
      alert(e.message);
      return e;
    });
});
export const addMusicToQueueBulk = createAsyncThunk("music/ADD_MUSIC_TO_QUEUE_BULK", (songs: {albumId: string, index: number}[]) => {
  return Promise.all(songs.map(({albumId, index}) => getClient().get(`/api/v1/album/${albumId}/${index}`)))
    .then(responses => responses.map(({data: {data}}, i) => ({...data, index: songs[i].index})))
    .catch(e => {
      alert(e.message)
      return e;
    });
});

function getMusicFromPayload(payload: any) {
  const {albumId, albumTitle, index, by, title, albumImage } = payload;
  const music: Music = {
    albumId,
    index,
    isFetching: true,
    data: {
      albumImage,
      albumTitle,
      title,
      by
    }
  }
  return music;
}

const MusicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    next(state) {
      if (state.currentPlayingIndex === undefined) {
        state.currentPlayingIndex = 0;
        return;
      }
      state.currentPlayingIndex = state.currentPlayingIndex + 1 < state.queue.length ? state.currentPlayingIndex + 1 : state.currentPlayingIndex;
    },
    prev(state) {
      if (state.currentPlayingIndex === undefined) return;

      state.currentPlayingIndex = state.currentPlayingIndex > 0 ? state.currentPlayingIndex - 1 : state.currentPlayingIndex;
    }
  },
  extraReducers: {
    [addMusicToQueue.fulfilled as any]: (state, action) => {
      const music = getMusicFromPayload(action.payload);
      state.queue.push(music);
    },
    [addMusicToQueueBulk.fulfilled as any]: (state, action) => {
      for (const payload of action.payload) {
        const music = getMusicFromPayload(payload);
        state.queue.push(music);
      }
    }
  }
});


export default MusicSlice;