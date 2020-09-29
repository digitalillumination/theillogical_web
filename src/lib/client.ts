import axios from "axios";

function getClient() {
  return axios.create({
    baseURL: process.env.REACT_API_URL || undefined,
    transformResponse: [
      (data, headers) => {
        const json = JSON.parse(data);
        if (data.success !== false || (headers.statusCode && (headers.statusCode >= 200 && headers.statusCode < 300))) {
          return json;
        }

        const error:any = new Error(json.message);
        error.code = data.code;

        throw error;
      }
    ]
  });
}

export default getClient;