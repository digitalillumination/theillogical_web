import React from 'react';
import styled from "styled-components";
import { getFullURL } from "../../lib/client";
import { useHistory } from 'react-router-dom';

interface AlbumProps {
  _id: string,
  title: string,
  image: string,
  artist: string
}

function Album({_id, title, image, artist}: AlbumProps) {
  const history = useHistory();

  return (
    <Layout onClick={() => history.push("/album/" + _id)}>
      <img src={getFullURL("/api/v1/image/" + image)} alt={title} className="cover" />
      <h1 className="title">{title.slice(0, 15) + (title.length >= 15 ? "..." : "")}</h1>
      <p className="artist">{artist}</p>
    </Layout>
  )
}

const Layout = styled.div`
  padding: 1em;
  cursor: pointer;
  .cover {
    width: 30vw;
    height: 30vw;
    min-width: 150px;
    min-height: 150px;
    max-width: 300px;
    max-height: 300px;
  }
  .title {
    margin: 0 0 0.4em;
    font-size: 1.2rem;
  }
  .artist {
    margin: 0;
  }
`;

export default Album;