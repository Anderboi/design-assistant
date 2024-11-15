"use client";

import { Dialog, DialogOverlay, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AlertConfirmation } from "./AlertConfirmation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Modal({ open, children }: {open:boolean, children: React.ReactNode }) {
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
      <DialogOverlay className="overflow-y-auto">
        <DialogContent className="overflow-y-auto h-full max-h-[600px] rounded-2xl">
          <DialogTitle className="hidden" />
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
