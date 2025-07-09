"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod/v4";
import { Input } from "../ui/input"
import { useUpdateProfil } from "@/hooks/useUpdateProfil";

const formSchema = z.object({
  username: z.string().min(1).optional(),
  lastname: z.string().min(1).optional(),
  professionalTitle: z.string().min(1).optional(),
  email: z.email().optional(),
  phone: z.e164().optional(),
  address: z.string().min(1).optional(),
  professionalResume: z.string().min(1).optional(),
})

export type FormValues = z.infer<typeof formSchema>

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-semibold mb-1">
        {label}
      </label>
      {children}
      {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </div>
  )
}

export function PersonalDataForm() {

  const mutation = useUpdateProfil()

  const {
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {}
  })

  const bind = (name: keyof FormValues) => {
    // on récupère les handlers de register
    const { onBlur: formOnBlur, ...rest } = register(name)

    return {
      ...rest,
      onBlur: async (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        formOnBlur(e)                       // validation zod
        const value = e.target.value
        mutation.mutate({ [name]: value })  // envoi partiel
      },
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold">Informations personnelles</h2>
      <p className="text-gray-400">Renseignez vos informations de contact et votre profil professionnel</p>
      <form className="space-y-4">
        {/* Prenom et nom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field id="username" label="Prénom" error={errors.username?.message}>
            <Input
              id="username"
              placeholder="Votre prénom"
              {...bind("username")}
              aria-invalid={!!errors.username}
              className="transition-colors"
            />
          </Field>

          <Field id="lastname" label="Nom" error={errors.lastname?.message}>
            <Input
              id="lastname"
              placeholder="Votre nom"
              {...bind("lastname")}
              aria-invalid={!!errors.lastname}
              className="transition-colors"
            />
          </Field>
        </div>

        {/* Titre professionnel */}
        <Field
          id="professionalTitle"
          label="Titre professionnel"
          error={errors.professionalTitle?.message}
        >
          <Input
            id="professionalTitle"
            placeholder="Ex : Développeur fullstack, Chef de projet…"
            {...bind("professionalTitle")}
            aria-invalid={!!errors.professionalTitle}
            className="transition-colors"
          />
        </Field>


        {/* Email et telephone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field id="email" label="Email" error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              placeholder="votre.email@exemple.com"
              {...bind("email")}
              aria-invalid={!!errors.email}
              className="transition-colors"
            />
          </Field>

          <Field id="phone" label="Téléphone" error={errors.phone?.message}>
            <Input
              id="phone"
              type="tel"
              placeholder="+33555555555"
              {...bind("phone")}
              aria-invalid={!!errors.phone}
              className="transition-colors"
            />
          </Field>
        </div>

        {/* Adresse */}
        <Field id="address" label="Adresse" error={errors.address?.message}>
          <Input
            id="address"
            placeholder="Ville, Pays"
            {...bind("address")}
            aria-invalid={!!errors.address}
            className="transition-colors"
          />
        </Field>

        {/* Resume professionnel */}
        <Field
          id="professionalResume"
          label="Résumé professionnel"
          error={errors.professionalResume?.message}
        >
          <textarea
            id="professionalResume"
            placeholder="Décrivez brièvement votre profil…"
            {...bind("professionalResume")}
            aria-invalid={!!errors.professionalResume}
            className="border border-gray-300 rounded-md p-2 text-base transition-colors focus:ring-2 focus:ring-primary w-full"
            rows={4}
          />
        </Field>

        {/* Feedback */}
        {mutation.isPending && <p>Envoi en cours…</p>}
        {mutation.isError && (
          <p className="text-red-500">Erreur : {mutation.error.message}</p>
        )}
        {mutation.isSuccess && <p className="text-green-600">Champ mis à jour ✔️</p>}
      </form>
    </>
  )
}


