import { twMerge } from "tailwind-merge";
import Ticket from "@/app/Ticket";
import Link from "next/link";

async function getTickets() {
  // simulate slow network
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0, // use 0 to opt out of caching
    },
  });
  return res.json() as Promise<Ticket[]>;
}

export default async function TicketList() {
  const tickets = await getTickets();
  return (
    <div className="space-y-5">
      {tickets.map((ticket) => (
        <div className="card" key={ticket.id}>
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={twMerge("pill", ticket.priority)}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets.</p>
      )}
    </div>
  );
}
