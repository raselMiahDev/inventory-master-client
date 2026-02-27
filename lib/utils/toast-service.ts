import { toast } from "react-hot-toast"

export const toastService = {
  success: (message: string) => {
    toast.success(message)
  },

  error: (message: string) => {
    toast.error(message)
  },

  loading: (message: string) => {
    return toast.loading(message)
  },

  dismiss: (id: string) => {
    toast.dismiss(id)
  }
}