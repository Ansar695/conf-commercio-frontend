import React from "react";
import { Button } from "../ui/button";
import useStore from "@/zustand/store";

const ResultCard = (props: any) => {
  const { data } = useStore();
  return (
    <div>
      <div
        className="max-w-[174px] px-[20px] py-[15px] rounded-[6px] mx-auto mt-[109px]"
        style={{ boxShadow: "0px 2px 16px 0px rgba(149, 173, 254, 0.50)" }}
      >
        <p className="text-[25px] text-[var(--heading)] leading-[128%] w-full">
          {data?.transcription ? <>“{data?.transcription}”</> : <>
            <p className="text-center text-red-500 text-[14px]">
              Si è verificato un errore durante l&apos;elaborazione dell&apos;audio. Per favore, rendi la tua voce chiara
            </p>
          </>}
        </p>
      </div>
      <Button
        className="mt-[161px] font-bold text-white leading-[24px] w-[272px] h-[61px] rounded-[100px]"
        style={{
          boxShadow: "0px 2px 16px 0px rgba(149, 173, 254, 0.50)",
          background:
            "linear-gradient(274deg, #0F3A56 -83.99%, #5CBDFA 142.46%)",
        }}
        onClick={props.scrollDownToView}
      >
        Analizza il tuo audio
      </Button>
    </div>
  );
};

export default ResultCard;
