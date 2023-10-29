"use client";
import { useRouter } from "next/navigation";
import { TiDelete } from "react-icons/ti";
import { useTransition } from "react";
import { deleteTicket } from "../create/actions";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      className="btn-primary"
      onClick={() => startTransition(() => deleteTicket(id))}
    >
      {isPending ? (
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
