"use client";
import React, { useRef, useState } from "react";
import SpinnerLoader from "../common/SpinnerLoader";
import Image from "next/image";
import { FaArrowUpLong } from "react-icons/fa6";
import ResultCard from "./ResultCard";
import ResultModal from "./ResultModal";
import ProcessAudio from "./ProcessAudio";
import { ProcessAudioResultData } from "@/typing/api";

const VoiceRecordWraper = (props: any) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState("");
  const [listenRecording, setListenRecording] = useState(false);
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
  let chunks: string[] = [];
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessAudioResultData | null>(null);

  const [recordingDuration, setRecordingDuration] = useState(0);
  const timerRef = useRef(null);

  const recordingAudio = async (status: Boolean) => {
    if (status) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaStream.current = stream;
        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.onstart = () => {
          timerRef.current = setInterval(() => {
            setRecordingDuration((prevDuration) => prevDuration + 1);
          }, 1000) as any;
        };

        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data as any);
          }
        };
        mediaRecorder.current.onstop = () => {
          const recordedBlob = new Blob(chunks, { type: "audio/webm" });
          setRecordedAudioBlob(recordedBlob as any);
          const url = URL.createObjectURL(recordedBlob);
          setRecordedUrl(url);
          chunks = [];
        };
        mediaRecorder.current.start();
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
      stopRecording();
    }
  };
  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      clearInterval(timerRef.current as any);
      setRecordingDuration(0);
    }
    setListenRecording(true);
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };


  const discardAudio = () => {
    setIsRecording(false);
    setListenRecording(false);
    setRecordingDuration(0);
    setRecordedAudioBlob(null);
    setRecordedUrl("");
  };

  const handleProccessing = (value: Boolean) => setIsProcessing(value as any);
  const handleResults = (value: any) => setResult(value as any);

  return (
    <div className="w-full max-w-[1216px] px-[36px] mx-auto flex flex-col md:flex-row items-start justify-between gap-0 md:gap-4 mt-[32px] md:mt-[81px] mb-[50px]">
      <p className="hidden md:block w-[50%] text-center md:text-start text-[37px] leading-[128%] text-[var(--heading)] max-w-[480px] pt-[42px]">
        Con <span className="font-bold">Mirroor</span> puoi registrare il tuo
        vocale rispondendo alla domanda qua accanto... buon divertimento!
      </p>

      <div
        className="bg-white w-full mx-auto md:mx-0 md:w-[50%] max-w-[580px] rounded-[25px] pt-0 md:pt-[63px] pb-0 md:pb-[43px] px-0 md:px-[87px] flex items-center flex-col shadow-none md:shadow-light-blue-1"
      >
        <div className="w-full text-[19px] text-[var(--heading)] max-w-[426px]">
          <h4 className="text-[21px] xl:text-[29px] text-[var(--heading)] font-bold text-center leading-[128%]">
            Cosa miglioreresti nel luogo e nel territorio in cui vivi ?
          </h4>
        </div>

        {result ? (
          <>
            <div className="block md:hidden">
              <ResultModal result={result} />
            </div>
            <div className="hidden md:block">
              <ResultCard result={result} scrollDownToView={props.scrollDownToView} />
            </div>
          </>
        ) : (
          <>
            {isProcessing && (
              <div className="mt-[43px] md:mt-[75px] flex flex-col items-center">
                <SpinnerLoader />
                <p className="text-[var(--heading)] mt-[22px] md:mt-[26px]">
                  ...processing your audio...
                </p>

                <div
                  className="px-[13px] py-[8px] sm:py-[18px] w-[190px] h-[76px] mt-[43px] md:mt-[112px] rounded-[38px] bg-white cursor-pointer flex items-center justify-center text-center text-[var(--heading)] font-[400]"
                  style={{
                    boxShadow: "0px 2px 16px 0px rgba(149, 173, 254, 0.50)",
                  }}
                >
                  I risultati saranno visibili in breve tempo
                </div>
              </div>
            )}

            {!isProcessing && (
              <>
                {!listenRecording && (
                  <div
                    className={`${isRecording ? "animate" : ""
                      } transition-all duration-500 relative w-[138px] h-[138px] rounded-full flex items-center justify-center mt-[37px] md:mt-[76px] cursor-pointer`}
                    onClick={() => {
                      setIsRecording(!isRecording);
                      recordingAudio(!isRecording);
                    }}
                  >
                    <div className="circle transition-all duration-500 layer1 absolute w-[138px] h-[138px] rounded-full z-0 bg-[#5CBDFA]"></div>
                    <div className="circle transition-all duration-500 layer2 absolute w-[138px] h-[138px] rounded-full z-0 bg-[#5CBDFA]"></div>
                    <div className="circle transition-all duration-500 layer3 absolute w-[138px] h-[138px] rounded-full z-0 bg-[#5CBDFA]"></div>
                    <Image
                      src="/icons/microphone.svg"
                      alt="microphone-img"
                      className="z-10"
                      width={138}
                      height={138}
                    />
                  </div>
                )}
                {listenRecording ? (
                  <>
                    <ProcessAudio
                      handleProccessing={handleProccessing}
                      handleResults={handleResults}
                      discardAudio={discardAudio}
                      recordedAudioBlob={recordedAudioBlob}
                      recordedUrl={recordedUrl}
                    />
                    {/* <audio
                      src={recordedUrl}
                      controls
                      className="h-[30px] min-h-[30px] w-[272px] mt-[37px] md:mt-[66px]"
                    />
                    <p className="text-[var(--heading)] mt-[15px] md:mt-[22px] font-bold leading-[128%] max-w-[318px] mx-auto text-center">
                    Ascolta per valutare il tuo audio & premi analizza il tuo audio o scarta 
                    </p>

                    <Button
                      className="mt-[50px] md:mt-[92px] font-bold text-white leading-[24px] w-[272px] h-[61px] rounded-[100px]"
                      style={{
                        boxShadow: "0px 2px 16px 0px rgba(149, 173, 254, 0.50)",
                        background:
                          "linear-gradient(274deg, #0F3A56 -83.99%, #5CBDFA 142.46%)",
                      }}
                      onClick={() => {
                        setIsProcessing(true);
                        setTimeout(() => {
                          setIsProcessing(false);
                          setResult(true);
                        }, 5000);
                      }}
                    >
                     Analizza  il tuo audio
                    </Button>
                    <Button
                      className="mt-[13px] font-bold text-white leading-[24px] w-[272px] h-[61px] rounded-[100px]"
                      style={{
                        boxShadow: "0px 2px 16px 0px rgba(149, 173, 254, 0.50)",
                        background:
                          "linear-gradient(274deg, #A31307 -83.99%, #EF6A60 142.46%)",
                      }}
                      onClick={discardAudio}
                    >
                      Scarta
                    </Button> */}
                  </>
                ) : (
                  <>
                    {isRecording ? (
                      <div className="w-[69px] h-[38px] rounded-[20px] bg-[#2F3540] flex items-center justify-center mt-[90px] md:mt-[155px]">
                        <p className="text-white text-[13px]">
                          {String(Math.floor(recordingDuration / 60)).padStart(
                            2,
                            "0"
                          )}
                          :{String(recordingDuration % 60).padStart(2, "0")}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-[37px] md:mt-[78px] flex items-center justify-center flex-col">
                        <FaArrowUpLong fontSize="18px" color="var(--heading)" />

                        <div
                          className="px-[20px] py-[8px] sm:py-[18px] w-[190px] h-[76px] mt-[13px] rounded-[38px] bg-white cursor-pointer flex items-center justify-center text-center text-[var(--heading)] font-[400]"
                          style={{
                            boxShadow:
                              "0px 2px 16px 0px rgba(149, 173, 254, 0.50)",
                          }}
                        >
                          Tieni premuto il microfono per iniziare a registrare
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceRecordWraper;
