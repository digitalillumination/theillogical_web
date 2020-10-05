import React from 'react';
import styled from "styled-components";

interface MusicListItemProps {
  index: number,
  title: string
}
function MusicListItem({index, title}: MusicListItemProps) {
  return (
    <Item>
      <div className="index">{index}</div>
      <div className="title">{title}</div>
    </Item>
  )
}

const Item = styled.div`
  display: flex;
  padding: 1rem;
  font-size: 1.25rem;
  .index {
    font-weight: bold;
    margin-right: 1em;
  }
`;

export default MusicListItem;