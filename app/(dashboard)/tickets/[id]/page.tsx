import { twMerge } from "tailwind-merge";
import { notFound } from "next/navigation";
import Ticket from "@/app/Ticket";

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const ticket = await getTicket(params.id);
  return {
    title: `Help Desk | ${ticket.title}`,
  };
}

export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/tickets");
  const tickets: Ticket[] = await res.json();
  return tickets.map((ticket) => ({
    id: ticket.id,
  }));
}

async function getTicket(id: string) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60, // use 0 to opt out of caching
    },
  });
  if (!res.ok) notFound();
  return res.json() as Promise<Ticket>;
}

export default async function TicketDetails({
  params,
}: {
  params: { id: string };
}) {
  const ticket = await getTicket(params.id);
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={twMerge("pill", ticket.priority)}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
