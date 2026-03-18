"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ className = "" }: { className?: string }) {
  const { back } = useRouter();
  return (
    <button className={className} onClick={back}>
      <ChevronLeft className="size-6" />
    </button>
  );
}
