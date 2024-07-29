import { useState } from "react";

export const useFetching = (callback) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  const fetching = async () => {
    setLoading(true);
    setError(null);
    try {
      await callback();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return [fetching, isLoading, isError];
};
