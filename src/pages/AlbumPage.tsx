import React from 'react';
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "react-query";
import getClient, { getFullURL } from "../lib/client";
import ErrorComponent from "../components/UI/ErrorComponent";
import LoaderComponent from "../components/UI/LoaderComponent";
import MusicListItem from "../components/UI/MusicListItem";


function AlbumPage({match: {params: {id}}}: RouteComponentProps<{id: string}>) {
  const {isLoading, isError, error, data} = useQuery(["album_page", id], () => getClient().get(`/api/v1/album/${id}`).then(({data: {data}}) => data));
  if (isError) return <ErrorComponent message={error.message} />
  if (isLoading) return <LoaderComponent />

  return (
    <Wrap>
      <header className="header">
        <img src={getFullURL("/api/v1/image/" + data.image)} className="cover" alt={data.title} />
        <h1 className="title">{data.title}</h1>
        <div className="by">
          <img src={getFullURL("/api/v1/image/" + data.by.profile_image)} className="by-profile" alt={data.by.username} />
          <h3>{data.by.username}</h3>
        </div>
      </header>
      <article className="musics">
        {data.songTitles.map((title: string, i: number) => <MusicListItem index={i+1} albumId={id} title={title} key={title} albumLength={data.songTitles.length} />)}
      </article>
    </Wrap>
  )
}

const Wrap = styled.div`
  padding: 2em;
  .header {
    max-width: 540px;
    margin: 0 auto;
    .cover {
      display: block;
      width: 100%;
      height: 100%;
      margin: 1em auto;
    }
    .title {
      text-align: center;
    }
    .by {
      display: flex;
      justify-content: center;
      
      .by-profile {
        width: 64px;
        height: 64px;
        border-radius: 32px;
        object-fit: cover;
      }
      h3 {
        margin-left: 1em;
        font-weight: normal;
      }
    }
  }
  .musics {
    max-width: 960px;
    margin: 1em auto;
  }
`;

export default AlbumPage;