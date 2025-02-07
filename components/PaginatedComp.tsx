"use client"

import React from "react";
import { usePagination } from "@/hook/usePagination";

const API_URL = "https://dummyjson.com/users"; // Example API

const PaginatedComponent: React.FC = () => {
  const { 
    data, 
    loading, 
    error, 
    page, 
    totalPages, 
    nextPage, 
    prevPage 
} = usePagination<{ 
    id: number; 
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: string;
 }>(API_URL, 5);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Paginated API Data</h2>
      <ul>
      {data.map((user) => (
          <li key={user.id} className="border-b p-2">
            <p>
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        <button disabled={page === 1} onClick={prevPage} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
          Previous
        </button>
        <span className="px-4 py-2">Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={nextPage} className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedComponent;
