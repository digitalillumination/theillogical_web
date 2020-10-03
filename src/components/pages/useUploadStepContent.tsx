import React, { useCallback, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  TextField,
  Typography
} from "@material-ui/core";
import blankImage from '../../assets/album-blank.png';
import useCreateFileForm from "../form/File";
import getClient, { getFullURL } from "../../lib/client";
import UploadedSongs, { SongType } from "./UploadedSongs";
import { useHistory } from "react-router-dom";
import useUploadAlbum from "../../hooks/useUploadAlbum";

function useUploadStepContent(step: number, setStep: React.Dispatch<React.SetStateAction<number>>) {
  const [kind, setKind] = useState<"single" | "album" | null>(null);
  const [albumName, setAlbumName] = useState("");
  const [imageId, setImageId] = useState<string | null>(null);
  const [songs, setSongs] = useState<SongType[]>([]);

  const [upload, {error, data, isLoading}] = useUploadAlbum();

  const fileForm = useCreateFileForm("plain", (el) => {
    const files = el.files;
    if (!files || files.length < 1 || files.length > 1) {
      alert("파일이 없거나 많습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("image", files[0]);
    getClient().post('/api/v1/image', formData)
      .then(({data: {data}}) => {
        setImageId(data.imageId);
      })
      .catch(e => {
        alert(e.message);
      })
  }, {accept: "image/*"});
  const songsFileForm = useCreateFileForm("plain", (el) => {
    const files = el.files;

    if (!kind) return;
    if (!files) {
      alert("파일이 없습니다.");
      return;
    }
    if (files.length < 1) {
      alert("파일이 없습니다.");
      return;
    }
    if (kind === 'single' && files.length > 1) {
      alert("파일은 하나만 필요합니다.");
      return;
    }

    const fileState = Array.from(files).map(file => ({
      file,
      title: file.name.split(".").slice(0, -1).join(".")
    }));
    setSongs(fileState);
  }, {accept: "audio/*", multiple: kind === 'album'});

  const history = useHistory();
  const toNext = useCallback(() => setStep(number => number + 1), [setStep]);
  const toPrev = useCallback(() => setStep(number => number - 1), [setStep]);
  function getOnChange(setter: any) {
    return (e: any) => setter(e.target.value);
  }
  function isAllNotEmpty(strings: string[]) {
    for (const str of strings) {
      if (!str) return false;
    }
    return true;
  }
  function onUpload() {
    upload({
      albumName,
      image: imageId as any,
      kind: kind as any,
      songs
    })
      .then(() => {
        toNext()
      });

  }
  const nextButton = (disabled: boolean = false) => (
    <Button variant="contained" onClick={toNext} color="primary" disabled={disabled}>다음</Button>
  );
  const prevButton = () => (
    <Button variant="contained" onClick={toPrev}>이전</Button>
  );

  function getElement() {
    switch (step) {
      case 0:
        return (
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">종류</FormLabel>
              <RadioGroup value={kind} onChange={e => e.target.value !== null && setKind(e.target.value as any)}>
                <FormControlLabel control={<Radio />} label="싱글 - 단 한 곡만 수록된 앨범입니다." value="single" />
                <FormControlLabel control={<Radio />} label="앨범 - 여러 곡이 포함됩니다." value="album" />
              </RadioGroup>
            </FormControl>
            <div className="action-buttons">
              {nextButton(kind === null)}
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <div className="album-image">
              <h3>앨범 이미지</h3>
              <img alt="Album" src={imageId ? getFullURL("/api/v1/image/" + imageId) : blankImage} />
              {fileForm}
              <form className="form" onSubmit={e => e.preventDefault()}>
                <TextField label={kind === "album" ? "앨범명" : "앨범 및 곡명"} value={albumName} onChange={getOnChange(setAlbumName)} fullWidth required />
              </form>
            </div>
            <div className="action-buttons">
              {prevButton()}
              {nextButton(!isAllNotEmpty([albumName]))}
              {!imageId && <div style={{display: 'inline'}}>이미지를 등록하지 않은 상태로 넘어갑니다!</div>}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            {kind === "album" && <UploadedSongs songs={songs} setSongs={setSongs}/>}
            {songsFileForm}
            <div className="action-buttons">
              {prevButton()}
              {<Button variant="contained" color="primary" onClick={onUpload} disabled={isLoading}>업로드</Button>}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <Typography variant="h4" component="h1">업로드 완료!</Typography>
            <Button color="primary" onClick={() => history.replace("/album/" + data.albumId)}>
              앨범 보기
            </Button>
          </div>
        );
      default:
        return null;
    }
  }

  return {
    element: getElement(),
    data: {
      kind,
      albumName,
      songs,
      imageId
    },
    error
  }
}

export default useUploadStepContent;