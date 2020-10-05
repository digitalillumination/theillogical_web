import React from 'react';
import { useQuery } from "react-query";
import getClient from "../../lib/client";
import ErrorComponent from "../UI/ErrorComponent";
import Album from "../UI/Album";

function AlbumList() {
  const {isLoading, isError, data, error} = useQuery("album_list", () => getClient().get("/api/v1/album").then(({data: {data}}) => data));

  if (isError) return <ErrorComponent message={error.message} />
  if (isLoading) return <div>로드 중...</div>;

  return (
    <div style={{display: 'flex'}}>
      {data.map((data: any) => (
        <Album key={data._id} {...data} />
      ))}
    </div>
  )
}

export default AlbumList;