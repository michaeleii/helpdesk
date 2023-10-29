"use client";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";

export default function DeleteButton({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/ticket", {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Ticket deleted");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button disabled={isLoading} className="btn-primary" onClick={handleClick}>
      {isLoading ? (
        <>
          <TiDelete />
          <span className="ml-2">Deleting...</span>
        </>
      ) : (
        <>
          <TiDelete />
          <span className="ml-2">Delete Ticket</span>
        </>
      )}
    </button>
  );
}
