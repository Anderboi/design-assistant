import React from 'react'
import { Modal } from '@/components/Modal'
import CreateProjectForm from '../../create/_components/CreateProjectForm'

function CreateProjectPage() {
  return (
    <Modal>
      <div className="p-8 max-w-md space-y-2">
          <h1 className="text-2xl">Создать проект</h1>
          <CreateProjectForm  />
      </div>
    </Modal>
  )
}

export default CreateProjectPage