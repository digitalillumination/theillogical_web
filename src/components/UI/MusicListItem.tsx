import React, { useState } from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { PlayArrow, PlaylistAdd } from "@material-ui/icons";
import usePlaylistManager from "../../hooks/usePlaylistManager";


interface MusicListItemProps {
  albumId: string,
  albumLength: number,
  index: number,
  title: string
}
function MusicListItem({albumId, index, title, albumLength}: MusicListItemProps) {
  const [hovering, setHovering] = useState(false);
  const playlist = usePlaylistManager();

  return (
    <Item onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <div className="index">{index}</div>
      <div className="title">{title}</div>
      <div className="actions">
        {hovering && (
          <>
            <IconButton onClick={() => playlist.replaceQueueFromAlbum(albumId, albumLength, index - 1)}>
              <PlayArrow />
            </IconButton>
            <IconButton onClick={() => playlist.addQueue(albumId, index)}>
              <PlaylistAdd />
            </IconButton>
          </>
        )}
      </div>
    </Item>
  )
}

const Item = styled.div`
  display: flex;
  padding: .5em 1rem;
  font-size: 1.25rem;
  align-items: center;
  .actions {
    height: 48px;
  }
  .index {
    font-weight: bold;
    margin-right: 1em;
  }
  .title {
    flex: 1;
  }
`;

export default MusicListItem;