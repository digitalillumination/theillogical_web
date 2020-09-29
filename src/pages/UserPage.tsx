import React, { useMemo } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "react-query";
import getClient, { getFullURL } from "../lib/client";
import ErrorComponent from "../components/UI/ErrorComponent";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Button } from "@material-ui/core";
import LoaderComponent from "../components/UI/LoaderComponent";

function UserPage({match: {params: {id}}}: RouteComponentProps<{id: string}>) {
  const {isLoading, isError, error, data} = useQuery(['user', id], () => getClient().get(`/api/v1/user/${id}`).then(({data: {data}}) => data), {retry: false});
  const user = useSelector((state: RootState) => state.user.user);

  const isSameUser = useMemo(() => user && data && user.id === data._id, [user, data]);
  if (isLoading) {
    return (
      <LoaderComponent />
    )
  }
  if (isError) {
    return (
      <ErrorComponent message={error.message} />
    )
  }

  return (
    <Layout>
      <header className="header">
        <img src={getFullURL("/api/v1/user/" + data._id + "/profile_image")} alt="Profile" className="profile_image"/>
        <h1 className="name">
          {data.username}
        </h1>
        {isSameUser && <Button className="change_profile" color="primary" variant="contained">프로필 사진 변경</Button>}
      </header>
    </Layout>
  )
}

const Layout = styled.div`
  .header {
    margin-top: 2em;
    
    .profile_image {
      width: 256px;
      height: 256px;
      border-radius: 128px;
      display: block;
      object-fit: cover;
      margin: 0 auto;
    }
    .name {
      text-align: center;
      margin: .25em 0 .5em;
    }
    .change_profile {
      display: block;
      margin: 0 auto;
    }
  }
`;

export default UserPage;