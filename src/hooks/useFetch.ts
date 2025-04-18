import { useCallback, useEffect, useState } from "react";
import { FetchStatus } from "../types";

const useFetch = <T>(fetchFn: () => Promise<T>, deps: unknown[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const memoizedFetchFn = useCallback(fetchFn, deps);

  useEffect(() => {
    const fetchData = async () => {
      setStatus(FetchStatus.LOADING);
      try {
        const result = await memoizedFetchFn();
        setData(result);
        setStatus(FetchStatus.SUCCESS);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setStatus(FetchStatus.ERROR);
      }
    };
    fetchData();
  }, [memoizedFetchFn]);

  return { data, status, error };
};

export default useFetch;
