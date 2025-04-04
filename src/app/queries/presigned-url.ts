import axios from "axios";
import { apiUrl } from "../utils/helpers";

export const getPreSignedUrl = async (filename: string) => {
  const data = await axios.post(
    apiUrl("/data"),
    {
      customer: "allcot",
      collection: filename.split(" ").shift(),
      object: filename,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_INFERENC_API_KEY,
      },
    }
  );

  return data;
};
