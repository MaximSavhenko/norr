export const errorCatch = (error: unknown): string => {
  if (error instanceof Error) {
    const axiosLikeError = error as {
      response?: { data?: { message?: string | string[] } };
    };

    const message = axiosLikeError?.response?.data?.message;

    if (message) {
      if (Array.isArray(message)) {
        return message[0] || "Unknown error";
      }
      return message;
    }

    return error.message || "Unknown error";
  }

  return "Unknown error";
};