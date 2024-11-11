'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormProvider, useForm } from 'react-hook-form'
import { Project, ProjectSchema } from '@/schemas/CreateProject'
import { InputWithLabel } from '@/components/InputWithLabel'
import { Button } from '@/components/ui/button'
import { createProject } from '@/app/actions/actions'

export default function CreateProjectForm() {
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({})
    const router = useRouter()

    const form = useForm<Project>({
        mode: 'onBlur',
        resolver: zodResolver(ProjectSchema),
        defaultValues: {address: "", area: 0}
    })

    useEffect(() => {
        //? bool value to indicate form has not been saved
        localStorage.setItem('projectFormModified', form.formState.isDirty.toString())
    }, [form.formState.isDirty])

    async function onSubmit(values: Project) {
        setMessage('')
        setErrors({})

        console.log(values);
        
   
        //TODO: server action to create project in supabase
        const createdProject = await createProject(values)
    }

  return (
    <div>
        {message ? (
                <h2 className="text-2xl">{message}</h2>
        ) : null}

        {errors ? (
            <div className="mb-10 text-red-500">
                {Object.keys(errors).map(key => (
                    <p key={key}>{`${key}: ${errors[key as keyof typeof errors]}`}</p>
                ))}
            </div>
        ) : null}

        <FormProvider {...form}>
            <form onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit(onSubmit)();
                }}>
                <InputWithLabel 
                    fieldTitle='Адрес' 
                    nameInSchema='address'
                />
                <InputWithLabel 
                    fieldTitle='Площадь' 
                    nameInSchema='area'
                    type='number'
                />
                <div className="flex gap-4">
                    <Button type='submit'>Submit</Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => form.reset()}
                    >Reset</Button>
                </div>
            </form>
        </FormProvider>
    </div>
  )
}