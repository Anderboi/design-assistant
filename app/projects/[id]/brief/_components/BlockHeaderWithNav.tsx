"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function BlockHeaderWithNav({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-start gap-2 pb-4">
      <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
        <ChevronLeft size={28} className="text-foreground" />
      </Button>
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
}

export default BlockHeaderWithNav;
