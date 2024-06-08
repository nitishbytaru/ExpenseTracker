import { toast } from "sonner";

export const showSuccessToast = (message) => {
  toast.success(message, {
    cancel: {
      label: "Cancel",
      onClick: () => {},
    },
  });
};

export const showErrorToast = (error) => {
  toast.error(error.response?.data || "An error occurred", {
    cancel: {
      label: "Cancel",
      onClick: () => {},
    },
  });
};

export const showWarnToast = (message) => {
  toast.warning(message, {
    cancel: {
      label: "Cancel",
      onClick: () => {},
    },
  });
};
