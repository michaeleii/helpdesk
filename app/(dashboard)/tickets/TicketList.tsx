import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

async function getTickets() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from("tickets").select();
  if (error) {
    console.error(error);
  }
  return data;
}

export default async function TicketList() {
  const tickets = await getTickets();
  return (
    <div className="space-y-5">
      {tickets &&
        tickets.map((ticket) => (
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
      {!tickets && <p className="text-center">There are no open tickets.</p>}
    </div>
  );
}
