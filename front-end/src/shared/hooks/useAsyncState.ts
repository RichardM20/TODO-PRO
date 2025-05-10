import { useState } from "react";

export function useAsyncState<T>() {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  return {
    data,
    isLoading,
    error,
    setData,
    setIsLoading,
    setError,
  };
}
