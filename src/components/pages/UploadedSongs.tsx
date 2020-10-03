import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";

export interface SongType {
  title: string,
  file: File
}

function UploadedSongs({songs, setSongs}: {songs: SongType[], setSongs: React.Dispatch<React.SetStateAction<SongType[]>>}) {
  return (
    <List>
      {songs.map((song, i) => (
        <Song song={song} i={i} key={i} change={str => {
          setSongs(songs => {
            const _songs = [...songs];
            _songs[i].title = str;

            return _songs;
          })
        }} />
      ))}
    </List>
  )
}

function Song({song, i, change}: {song: SongType, i: number, change(str: string): void}) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(song.title);

  const editor = (
    <form onSubmit={e => {
      e.preventDefault();
      change(title);
      setEdit(false);
    }} style={{display: 'flex'}}>
      <TextField value={title} onChange={e => setTitle(e.target.value)} focused={true} />
      <Button type="submit">수정</Button>
    </form>
  )
  return (
    <ListItem key={i}>
      {edit ? editor : <ListItemText primary={`${i+1}. ${song.title}`} />}
      {!edit && <ListItemSecondaryAction>
        <IconButton aria-label="edit" edge="end" onClick={() => setEdit(true)}>
          <Edit />
        </IconButton>
      </ListItemSecondaryAction>}
    </ListItem>
  )
}
export default UploadedSongs;