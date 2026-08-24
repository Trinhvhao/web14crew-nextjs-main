import { ArrowDown } from "lucide-react";

interface ScrollIndicatorProps {
  className?: string;
  tone?: "light" | "dark";
}

export default function ScrollIndicator({ className = "", tone = "light" }: ScrollIndicatorProps) {
  const textColor = tone === "dark" ? "text-[#791220]" : "text-[#F2C94C]";

  return (
    <div className={`flex flex-col items-center gap-[6px] ${className}`}>
      <span
        className={`text-[13px] font-bold uppercase tracking-[0.15em] font-sans mb-[8px] ${textColor}`}
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        SCROLL
      </span>
      <div className="w-[2px] h-[60px] bg-[#F2C94C]" />
      <ArrowDown size={16} className="text-[#F2C94C] stroke-[3] -mt-[2px]" />
    </div>
  );
}
