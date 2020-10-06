import React from 'react';
import { Modal, Typography } from "@material-ui/core";
import styled from "styled-components";
import { Music } from "../../store/music";
import { getFullURL } from "../../lib/client";
import usePlaylistManager from "../../hooks/usePlaylistManager";

interface PlaylistModalProps {
  open: boolean,
  onClose(): any
}
function PlaylistModal({open, onClose}: PlaylistModalProps) {
  const {queue} = usePlaylistManager();
  return (
    <Modal open={open} onClose={onClose}>
      <Wrap>
        <Typography variant="h6" component="h1">플레이리스트</Typography>
        <div style={{overflowY: 'scroll', flex: 1}}>
          <div className="playlist">
            {queue.map((song, i) => <Song music={song} key={i} index={i} />)}
          </div>
        </div>
      </Wrap>
    </Modal>
  );
}

function Song({music, index}: {music: Music, index: number}) {
  const {currentPlayingIndex, playByIndex} = usePlaylistManager();
  if (!music.isFetching) return null;

  function toPlayThisMusic() {
    playByIndex(index);
  }
  return (
    <div className={["song", currentPlayingIndex === index && "current-playing"].filter(Boolean).join(' ')} onClick={toPlayThisMusic}>
      <img src={getFullURL(`/api/v1/image/${music.data?.albumImage}`)} alt={music.data?.title} />
      <div className="information">
        <h3 className="title">{music.data?.title}</h3>
        <div className="by">{music.data?.by.username}</div>
      </div>
    </div>
  )
}

const Wrap = styled.div`
  position: absolute;
  top: 10vh;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top-left-radius: 5vw;
  border-top-right-radius: 5vw;
  padding: 2em;
  display: flex;
  flex-direction: column;
  
  .playlist {
    .song {
      display: flex;
      align-items: center;
      padding: 1em;
      cursor: pointer;
      &.current-playing {
        background: #EAEAEA;
      }
      img {
        width: 64px;
        height: 64px;
      }
      .information {
        margin-left: 1.5em;
        .title {
          margin: 0;
        }
      }
    }
  }
`;

export default PlaylistModal;