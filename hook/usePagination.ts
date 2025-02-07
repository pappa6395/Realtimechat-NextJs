import { useState, useEffect } from "react";

interface PaginationResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

export function usePagination<T>(apiUrl: string, itemsPerPage: number = 10): PaginationResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiUrl}?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        setData(result.users);

        const totalItems = result.total || 100; // Get total items from API response
        setTotalPages(Math.ceil(totalItems / itemsPerPage));

      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, page, itemsPerPage]);

  // Pagination controls
  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return { data, loading, error, page, totalPages, nextPage, prevPage };
}
