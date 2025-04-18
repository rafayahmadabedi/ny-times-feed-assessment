import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "./useFetch";
import { FetchStatus } from "../types/fetch-status.enum";

describe("useFetch Hook", () => {
  it("should return loading state initially", async () => {
    const mockFetch = jest.fn(() => Promise.resolve("test data"));
    const { result } = renderHook(() => useFetch(mockFetch));

    expect(result.current.status).toBe(FetchStatus.LOADING);
    expect(result.current.data).toBeNull();
  });

  it("should return data on successful fetch", async () => {
    const mockData = { results: [] };
    const mockFetch = jest.fn(() => Promise.resolve(mockData));
    const { result } = renderHook(() => useFetch(mockFetch));

    await waitFor(() => {
      expect(result.current.status).toBe(FetchStatus.SUCCESS);
      expect(result.current.data).toEqual(mockData);
    });
  });

  it("should return error on failed fetch", async () => {
    const mockError = new Error("Test error");
    const mockFetch = jest.fn(() => Promise.reject(mockError));
    const { result } = renderHook(() => useFetch(mockFetch));

    await waitFor(() => {
      expect(result.current.status).toBe(FetchStatus.ERROR);
      expect(result.current.error).toBe("Test error");
    });
  });
});
