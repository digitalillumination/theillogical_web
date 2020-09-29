import axios from "axios";

const baseURL = process.env.REACT_API_URL || undefined;

function getClient() {
  return axios.create({
    baseURL,
    transformResponse: [
      (data, headers) => {
        const json = JSON.parse(data);
        if (json.success !== false || (headers.statusCode && (headers.statusCode >= 200 && headers.statusCode < 300))) {
          return json;
        }

        const error: any = new Error(json.message);
        error.code = data.code;

        throw error;
      }
    ]
  });
}

export function getFullURL(path: string) {
  if (!baseURL) return path;

  return new URL(path, baseURL).toString();
}
export default getClient;