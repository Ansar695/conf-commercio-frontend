import { ProcessAudioApiResponse } from "@/typing/api";
import axiosClient from "../axios";
import authApi from "./auth-api";

async function processAudio(audio: Blob): Promise<ProcessAudioApiResponse> {
  try {
    const formData = new FormData();
    formData.append("file", audio, `audio-${new Date().toISOString()}.webm`);
    const res = await axiosClient.post(
      `/process-audio`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      succeed: false,
    };
  }
}

const api = {
  processAudio,
  ...authApi,
};

export default api;
