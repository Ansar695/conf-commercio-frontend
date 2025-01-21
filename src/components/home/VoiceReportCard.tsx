'use client'
import { ProcessAudioResultData } from "@/typing/api";
import useStore from "@/zustand/store";
import React, { useEffect, useState } from "react";

const progressValues = [
  { title: "Educazione e scuola ", per: "0%" },
  { title: "Divertimento", per: "0%" },
  { title: "Ambiente", per: "0%" },
  { title: "Sport ", per: "0%" },
];

const VoiceReportCard = () => {
  const [values, setValues] = useState<ProcessAudioResultData["political_needs"]>([])
  const { data } = useStore();

  useEffect(() => {
    setValues(data?.political_needs ?? [])
  }, [data])

  return (
    <div className="w-full max-w-[1216px] px-[36px] mx-auto" id="results">
      <div className="hidden md:block w-full px-[36px] mx-auto rounded-[28px] bg-white py-[48px] mt-[67px] shadow-light-blue-1">
        <h3 className="text-[37px] text-[var(--heading)] font-bold leading-[128%] mb-[38px]">
          La nostra AI analizza la tua risposta in modo anonimo
        </h3>
        {values?.map((value, index) => (
          <div key={index} className="mb-[29px]">
            <p className="font-[400] text-[15px] sm:text-[16px] text-[var(--heading)] leading-[128%] mb-[8px]">
              {value?.key}
            </p>
            <div className="flex items-center justify-between gap-[20px]">
              <div className="w-[100%] bg-[#EEF1F3] h-[15px] rounded-[20px] overflow-hidden">
                <div style={{ width: `${value?.value}%` }} className={`progress-percentage h-full bg-[var(--heading)] rounded-[20px]`}></div>
              </div>
              <p className="my-0 text-[12px] text-[#B6B4C2]">{value?.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceReportCard;
