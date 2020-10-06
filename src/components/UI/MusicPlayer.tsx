import React, { useRef, useState } from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { PlayArrow, QueueMusic, SkipNext, SkipPrevious, Pause } from "@material-ui/icons";
import usePlaylistManager from "../../hooks/usePlaylistManager";
import { getFullURL } from "../../lib/client";
import usePlayerManager from "../../hooks/usePlayerManager";
import PlaylistModal from "../modals/PlaylistModal";

function MusicPlayer() {
  const ref = useRef<HTMLAudioElement|null>(null);
  const [open, setOpen] = useState(false);
  const {currentPlaying, prev, next} = usePlaylistManager();
  const player = usePlayerManager(ref);

  return (
    <Player image={currentPlaying?.data?.albumImage}>
      <PlaylistModal open={open} onClose={() => setOpen(false)} />
      <div className="percentage-bar">
        <div className="progress" style={{width: `${player.percent * 100}%`}}/>
      </div>
      <audio src={currentPlaying && currentPlaying.isFetching ? getFullURL(`/api/v1/album/${currentPlaying.albumId}/${currentPlaying.index}/music`) : undefined} autoPlay ref={ref} />
      <div className="album-cover" />
      <div className="music">
        {!currentPlaying || !currentPlaying.isFetching ?
          <div className="no-playing">재생 중인 곡이 없습니다.</div>
          : (
            <>
              <div className="title">{currentPlaying.data?.title}</div>
              <div className="by-and-duration">
                {currentPlaying.data?.by.username} {" - "}
                {player.formatTime(player.currentTime)} / {player.formatTime(player.duration)}
              </div>
            </>
          )
        }
      </div>
      <div className="actions">
        <IconButton onClick={prev}>
          <SkipPrevious />
        </IconButton>
        <IconButton onClick={next}>
          <SkipNext />
        </IconButton>
        <IconButton onClick={player.pauseOrPlay}>
          {player.isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={() => setOpen(true)}>
          <QueueMusic />
        </IconButton>
      </div>
    </Player>
  )
}

const Player = styled.div<{image?: string}>`
  padding: 1em 2em;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.2);
  background: white;
  align-items: center;
  
  .percentage-bar {
    position: absolute;
    top: -5px;
    height: 5px;
    left: 0;
    right: 0;
    background: #EAEAEA;
    .progress {
      background: blue;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }
  }
  .album-cover {
    width:50px;
    height: 50px;
    background: ${props => props.image ? `url(${getFullURL(`/api/v1/image/${props.image}`)}) center no-repeat` : 'gray'};
    background-size: cover;
  }
  .music {
    flex: 1;
    margin-left: 1em;
    .title {
      font-weight: bold;
      
    }
    .by-and-duration {
      font-size: .75em;
    }
  }
  
`;

export default MusicPlayer;