"use client"

import {
    Dialog,
    DialogOverlay,
    DialogContent,
} from "@/components/ui/dialog"
import { AlertConfirmation } from "./AlertConfirmation"
import { useRouter } from "next/navigation"
import { useState } from 'react'
import { DialogTitle } from "@radix-ui/react-dialog"

export function Modal({
    children,
}: {
    children: React.ReactNode
}) {
    const [showExitConfirmation, setShowExitConfirmation] = useState(false)
    const router = useRouter()

    const closeModal = () => {
        router.back()
    }

    const handleOpenChange = () => {
        
        const isUserFormModified = localStorage.getItem("projectFormModified")
        if (isUserFormModified && JSON.parse(isUserFormModified)) {
            setShowExitConfirmation(true)
        } else {
            router.back()
        }
    }

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
            <DialogOverlay>
                <DialogContent className="overflow-y-hidden">
                    <DialogTitle className="hidden"/>
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
    )
}