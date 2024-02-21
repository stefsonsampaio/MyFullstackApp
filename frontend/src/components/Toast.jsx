import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const showToast = (message, type) => {
  const toastType = type === 'success' ? toast.success : toast.error

  toastType(message, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}

export default showToast