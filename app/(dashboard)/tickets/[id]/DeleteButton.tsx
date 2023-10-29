"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);

    const res = await fetch(`/api/tickets/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (json.error) {
      console.error(json.error);
      setIsLoading(false);
    } else {
      router.refresh();
      router.push("/tickets");
    }
    setIsLoading(false);
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
