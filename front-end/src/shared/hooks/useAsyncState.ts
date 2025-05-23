import { useState } from "react";

export function useAsyncState<T>(props?: T) {
  const [data, setData] = useState<T | undefined>(props);
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
