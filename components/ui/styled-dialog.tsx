import React from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { X } from "lucide-react";

export function StyledDialog({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <DialogContent className="h-full max-h-[90vh] overflow-y-scroll rounded-xl bg-secondary no-scrollbar sm:max-w-[520px]">
      <DialogHeader className="sticky top-0 z-40 flex h-fit flex-row items-center justify-between rounded-xl bg-background px-4 shadow-cardshadow">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <DialogClose className="!mt-0 h-full !space-y-0">
          <X className="h-6 w-6" />
        </DialogClose>
      </DialogHeader>
      <section className="h-[calc(100%-68px)] pt-4">{children}</section>
    </DialogContent>
  );
}

export function StyledDialogFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="sticky bottom-0 w-full rounded-xl bg-background p-4 shadow-cardshadow">
      {children}
    </div>
  );
}
