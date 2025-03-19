import { toast, ToastOptions } from "react-toastify";

const toastOptionDefault: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: false,
  theme: "colored",
};

export const toastSuccess = (
  message: string,
  toastOption: ToastOptions = toastOptionDefault
): void => {
  toast.success(message, toastOption);
};

export const toastError = (
  message: string,
  toastOption: ToastOptions = toastOptionDefault
): void => {
  toast.error(message, toastOption);
};

export const toastErrorWithDetails = (
  message: string,
  error: unknown,
  toastOption: ToastOptions = toastOptionDefault
): void => {
  const errorMessage =
    error instanceof Error ? error.message : "An unknown error occurred";
  toast.error(`${message}: ${errorMessage}`, toastOption);
};
