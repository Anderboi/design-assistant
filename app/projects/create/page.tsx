import React from 'react'
import CreateProjectForm from './_components/CreateProjectForm'

function CreateProjectPage() {
  return (
    <div className="p-8 max-w-md space-y-2">
        <h1 className="text-2xl">Создать проект</h1>
        <CreateProjectForm  />
    </div>
  )
}

export default CreateProjectPage