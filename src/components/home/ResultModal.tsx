"use client";
import React, { useEffect, useState } from "react";
import useStore from "@/zustand/store";
import { Button } from "../ui/button";
import { IoMdClose } from "react-icons/io";
import { ProcessAudioResultData } from "@/typing/api";

const progressValues = [
  { title: "Educazione e scuola ", per: 2 },
  { title: "Divertimento", per: 25 },
  { title: "Ambiente", per: 5 },
  { title: "Sport ", per: 80 },
];

type ResultModalProps = {
  result: ProcessAudioResultData;
}

const ResultModal = (props: ResultModalProps) => {
  const [open, setOpen] = useState(true);
  const [values, setValues] = useState<ProcessAudioResultData["political_needs"]>([])
  const { data } = useStore();

  useEffect(() => {
    if (props.result?.political_needs?.length > 0) {
      setValues(props.result.political_needs)
    } else {
      setValues(data?.political_needs ?? [])
    }
  }, [data])

  return (
    <div
      className={` fixed top-0 right-0 bottom-0 left-0 ${open ? 'flex' : 'hidden'} items-center justify-center`}
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="w-[92%] h-auto max-h-[94vh] bg-white rounded-lg pb-[13px] relative">
        <div
          className="absolute top-[-15px] right-[-15px] rounded-full w-[34px] h-[34px] bg-[var(--heading)] flex items-center justify-center"
          onClick={() => {
            setOpen(false)
            window.location.reload()
          }}
        >
          <IoMdClose color="white" />
        </div>
        <div className="w-[100%] h-auto max-h-[94vh] overflow-auto bg-white rounded-lg pb-[13px] pt-[67px] px-[23px]">
          <p className="text-[var(--heading)] text-[21px] font-bold leading-[128%]">
            Cosa miglioreresti nel luogo e nel territorio in cui vivi ?
          </p>
          <div className="mb-[81px] flex flex-col items-center">
            <div className="max-w-[174px] px-[29px] py-[15px] rounded-[6px] mx-auto mt-[40px] shadow-light-blue-1">
              <p className="text-[25px] text-[var(--heading)] leading-[128%]">
                “Ambiente”
              </p>
            </div>
            <Button
              className="mt-[51px] font-bold text-white leading-[24px] w-[272px] h-[61px] rounded-[100px]"
              style={{
                boxShadow: "0px 2px 16px 0px rgba(149, 173, 254, 0.50)",
                background:
                  "linear-gradient(274deg, #0F3A56 -83.99%, #5CBDFA 142.46%)",
              }}
            >
              Grazie per il tuo tempo!
            </Button>
          </div>
          <div className="h-[81px]"></div>
          {values?.map((value, index) => (
            <div key={index} className="mb-[29px]">
              <p className="font-[400] text-start text-[15px] sm:text-[16px] text-[var(--heading)] leading-[128%] mb-[8px]">
                {value?.key}
              </p>
              <div className="flex items-center justify-between gap-[20px]">
                <div className="w-[92%] bg-[#EEF1F3] h-[15px] rounded-[20px] overflow-hidden">
                  <div
                    className={`progress-percentage h-full w-[${value?.value}%] bg-[var(--heading)] rounded-[20px]`}
                  ></div>
                </div>
                <p className="my-0 text-[12px] text-[#B6B4C2] w-[8%]">
                  {value.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
