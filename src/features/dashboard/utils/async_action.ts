const handleAsyncAction = async <T>(
  action: () => Promise<T | null>,
  setIsLoading: (loading: boolean) => void,
  setError: (error?: string) => void,
  onSuccess?: (result: T) => Promise<void> | void
): Promise<T | null> => {
  setIsLoading(true);
  setError(undefined);

  try {
    const result = await action();
    if (result !== null && onSuccess) {
      await onSuccess(result);
    }
    return result;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    setError(errorMessage);
    throw err;
  } finally {
    setIsLoading(false);
  }
};
export default handleAsyncAction;