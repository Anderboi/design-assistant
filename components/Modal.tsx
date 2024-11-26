"use client";

import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { AlertConfirmation } from "./AlertConfirmation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Modal({
  open,
  children,
  title,
  trigger,
}: {
  open: boolean;
  children: React.ReactNode;
  title?: string;
  trigger?: React.ReactNode;
}) {
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  const handleOpenChange = () => {
    const isUserFormModified = localStorage.getItem("projectFormModified");
    if (isUserFormModified && JSON.parse(isUserFormModified)) {
      setShowExitConfirmation(true);
    } else {
      router.back();
    }
  };

  return (
    <Dialog defaultOpen={true} open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogOverlay className="overflow-y-auto">
        <DialogContent className="h-full max-h-[600px] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className={`${!title && "hidden"}`}>
              {title}
            </DialogTitle>
            <DialogDescription className="hidden" />
          </DialogHeader>
          <AlertConfirmation
            open={showExitConfirmation}
            setOpen={setShowExitConfirmation}
            confirmationAction={closeModal}
            message="Вы не сохранили изменения. Пожалуйста подтвердите, что вы хотите выйти не сохраняя изменения."
          />
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
