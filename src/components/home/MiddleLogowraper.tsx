'use client'
import Image from "next/image";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MiddleLogowraper = () => {
    const[open, setOpen] = useState(false)
  return (
    <div className="w-full max-w-[1216px] px-[36px] mx-auto flex flex-col md:flex-row items-end justify-between gap-0 md:gap-4 mt-[37px] md:mt-[81px]">
      <Image
        alt="logo"
        src="/images/toscana-logo-1.png"
        width={391}
        height={173}
        className="aspect-[2.26] w-[169px] md:w-[391px] h-[74px] md:h-[173px] mx-auto md:mx-0"
      />

      <p className="block md:hidden w-full md:w-[50%] overflow-hidden text-center text-[18px] leading-[128%] text-[var(--heading)] mt-[18px] mb-[32px]">
        Con <span className="font-bold">Mirroor</span> puoi registrare il tuo
        vocale rispondendo alla domanda qua accanto... buon divertimento!
      </p>

      <div className='w-full max-w-[1180px] block md:hidden mx-auto h-[1px]' style={{backgroundColor: 'rgba(15, 58, 86, 0.32)'}}></div>

      <div
        className="bg-white w-full md:w-[50%] max-w-[580px] min-h-0 md:min-h-[171px] md:rounded-[25px] p-2 md:p-[31px] mx-auto md:mx-0 mt-[29px] shadow-none md:shadow-light-blue-1 mb-[45px] md:mb-0"
      >
        <h3 className="text-[29px] text-[var(--heading)] font-bold leading-[128%] mb-[22px] text-center">
          Qual è la tua età?
        </h3>
        <Select>
          <SelectTrigger onFocus={() => setOpen(true)} className={`w-full max-w-[470px] mx-auto h-[50px] rounded-lg text-[var(--heading)] ${open ? 'border-[#00AEEF]' : ''} `}>
            <SelectValue placeholder="Da 6 a 10 anni" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem className="hover:text-[#00AEEF]" value="Da 6 a 10 anni">Da 6 a 10 anni</SelectItem>
              <SelectItem className="hover:text-[#00AEEF]" value="Da 11 a 13 anni">Da 11 a 13 anni</SelectItem>
              <SelectItem className="hover:text-[#00AEEF]" value="Da 14 a 18 anni">Da 14 a 18 anni</SelectItem>
              <SelectItem className="hover:text-[#00AEEF]" value="Da 19 a 28 anni">Da 19 a 28 anni</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='w-full max-w-[1180px] block md:hidden mx-auto h-[1px]' style={{backgroundColor: 'rgba(15, 58, 86, 0.32)'}}></div>
    </div>
  );
};

export default MiddleLogowraper;
