import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "react-query";
import getClient, { getFullURL } from "../lib/client";
import ErrorComponent from "../components/UI/ErrorComponent";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Button } from "@material-ui/core";
import LoaderComponent from "../components/UI/LoaderComponent";
import useCreateFileForm from "../components/form/File";

function UserPage({match: {params: {id}}}: RouteComponentProps<{id: string}>) {
  const {isLoading, isError, error, data} = useQuery(['user', id], () => getClient().get(`/api/v1/user/${id}`).then(({data: {data}}) => data), {retry: false});
  const user = useSelector((state: RootState) => state.user.user);
  const imageRef = useRef<HTMLImageElement | null>(null);

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
        <img ref={imageRef} src={getFullURL("/api/v1/user/" + data._id + "/profile_image")} alt="Profile" className="profile_image"/>
        <h1 className="name">
          {data.username}
        </h1>
        {isSameUser && <ProfileSelect id={data._id} image={imageRef.current} />}
      </header>
    </Layout>
  )
}
function ProfileSelect({id, image}: {id: string, image: HTMLImageElement | null}) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  function onSubmit(file: HTMLInputElement) {
    if (!file.files || file.files.length < 1 || file.files.length > 1) return;
    const formData = new FormData();
    formData.append("image", file.files[0]);
    getClient().put('/api/v1/user/profile_image', formData)
      .then(() => {
        if (image) {
          image.src = getFullURL("/api/v1/user/" + id + "/profile_image") + '?t=' + Date.now();
        }
        setOpen(false);
      })
      .catch(e => {
        alert(e.message);
      })
  }

   const element = useCreateFileForm("popover", onSubmit, { onClose: () => setOpen(false), open, accept: "image/*", anchorEl });
  return (
    <>
      <Button className="change_profile" color="primary" variant="contained" onClick={(e) => {
        setAnchorEl(e.currentTarget);
        setOpen(true);
      }}>프로필 사진 변경</Button>
      {element}
    </>
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