'use client'
import CustomDivider from "@/components/common/CustomDivider";
import MiddleLogowraper from "@/components/home/MiddleLogowraper";
import VoiceRecordWraper from "@/components/home/VoiceRecordWraper";
import VoiceReportCard from "@/components/home/VoiceReportCard";
import Image from "next/image";
import NavBar from "./header";

export default function Home() {
  const scrollDownToView = () => {
    const element = document.getElementById("results");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <main className="bg-white sm:bg-[var(--main-bg)]">
      <NavBar />
      <MiddleLogowraper />
      <VoiceRecordWraper scrollDownToView={scrollDownToView} />
      <div className="hidden md:block">
      <CustomDivider />
      </div>
      <VoiceReportCard />

        <div className="hidden md:flex flex-col md:flex-row justify-center gap-[15px] items-center md:items-end mt-[0px] md:mt-[79px] pb-[63px]">
          <p className="my-0 font-lora italic text-[14px]">
            <span className="font-bold">Mirroor</span> è un progetto di
          </p>
          <Image
            alt="bg-img"
            src="/images/mirroor-black-logo.png"
            width={137}
            height={23}
          />
          <p className=" mt-[10px] md:my-0 font-lora italic text-[14px]">
            Binoocle Institute srl, info@binoocle.com{" "}
          </p>
        </div>
    </main>
  );
}
