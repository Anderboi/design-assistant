import React from 'react'

function ProjectsLayout({
    children, 
    modal
}: Readonly<{
    children: React.ReactNode, 
    modal: React.ReactNode
}>) {
  return (
    <>
        {modal}
        {children}
    </>
  )
}

export default ProjectsLayout