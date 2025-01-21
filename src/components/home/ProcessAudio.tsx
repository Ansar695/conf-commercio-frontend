import React from "react";
import { Button } from "../ui/button";
import useStore from "@/zustand/store";
import api from "@/lib/api";
import { ProcessAudioResultData } from "@/typing/api";


type ProcessAudioProps = {
  handleResults: (value: ProcessAudioResultData) => void;
  handleProccessing: (value: boolean) => void;
  recordedAudioBlob?: Blob | null;
  recordedUrl?: string;
  discardAudio?: () => void
}

const ProcessAudio = (props: ProcessAudioProps) => {
  const setData = useStore((state) => state.setData);
  const uploadAudio = async () => {
    props.handleProccessing(true);
    console.log("record ", props?.recordedAudioBlob);
    try {
      const response = await api.processAudio(props?.recordedAudioBlob as any)
      if (!response.succeed) throw new Error("Failed to process audio")
      props.handleResults(response?.data);
      setData(response?.data)
    } catch (error) {
      console.error("Error uploading audio:", error);
    } finally {
      props.handleProccessing(false);
    }
  };

  return (
    <>
      <audio
        src={props?.recordedUrl}
        controls
        className="h-[30px] min-h-[30px] w-[272px]"
      />
      <p className="text-[var(--heading)] mt-[22px] font-bold leading-[128%] max-w-[318px] mx-auto text-center">
        Ascolta per valutare il tuo audio, premi analizza per processare il tuo
        audio o scarta per poterlo registrare di nuovo
      </p>

      <Button
        className="mt-[52px] font-bold text-white leading-[24px] w-[272px] h-[61px] rounded-[100px]"
        style={{
          boxShadow: "0px 2px 16px 0px rgba(149, 173, 254, 0.50)",
          background:
            "linear-gradient(274deg, #0F3A56 -83.99%, #5CBDFA 142.46%)",
        }}
        onClick={() => {
          // setIsProcessing(true)
          // setTimeout(() => {
          //   setIsProcessing(false)
          //   props.handleResults(true)
          // }, 5000)
          uploadAudio();
        }}
      >
        Analizza il tuo audio
      </Button>
      <Button
        className="mt-[13px] font-bold text-white leading-[24px] w-[272px] h-[61px] rounded-[100px]"
        style={{
          boxShadow: "0px 2px 16px 0px rgba(149, 173, 254, 0.50)",
          background:
            "linear-gradient(274deg, #A31307 -83.99%, #EF6A60 142.46%)",
        }}
        onClick={props?.discardAudio}
      >
        Scarta
      </Button>
    </>
  );
};

export default ProcessAudio;
