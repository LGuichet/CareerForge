import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { FormValues } from "@/components/sections/personalDataForm"

const API = "/api";

export const useUpdateProfil = () => {
  const queryClient = useQueryClient()

  return useMutation<
    void,                   
    Error,                   
    Partial<FormValues>     
  >({
    mutationFn: async (partial) => {
      const res = await fetch(`${API}/profil/1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partial),
      })
      if (!res.ok) throw new Error("Erreur réseau")
    
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profil", 1] })
    },
  })
}