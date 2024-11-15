"use client";

import React, { useState } from "react";
import { Modal } from "@/components/Modal";
import CreateProjectForm from "../../create/_components/CreateProjectForm";

function CreateProjectPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal open={isOpen}>
      <div className="max-w-md space-y-2 p-8">
        <h1 className="text-2xl font-semibold">Создать проект</h1>
        <CreateProjectForm setIsOpen={setIsOpen} />
      </div>
    </Modal>
  );
}

export default CreateProjectPage;
