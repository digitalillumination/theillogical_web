import { SongType } from "../components/pages/UploadedSongs";
import { useMutation } from "react-query";
import getClient from "../lib/client";

interface MutationProps {
  kind: string, albumName: string, songs: SongType[], image?: string
}
function useUploadAlbum() {
  return useMutation(({ kind, albumName, songs, image }: MutationProps) => {
    const formData = new FormData();

    formData.append("albumName", albumName);
    formData.append("kind", kind);
    image && formData.append("albumImageId", image);

    if (kind === "single") {
      formData.append("songs", songs[0].file);
    } else {
      for (const song of songs) {
        formData.append("songs", song.file);
        formData.append("title", song.title);
      }
    }

    return getClient().post("/api/v1/album", formData)
      .then(({data: {data}}) => data);
  });
}

export default useUploadAlbum;