import { twMerge } from "tailwind-merge";
import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import DeleteButton from "./DeleteButton";

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: ticket } = await supabase
    .from("ticket")
    .select()
    .eq("id", params.id)
    .single();
  return {
    title: `Help Desk | ${ticket.title || "Ticket not found"}`,
  };
}

async function getTicket(id: string) {
  const supabase = createServerComponentClient({ cookies });
  const { data: ticket } = await supabase
    .from("ticket")
    .select()
    .eq("id", id)
    .single();
  if (!ticket) {
    notFound();
  }
  return ticket;
}

export default async function TicketDetails({
  params,
}: {
  params: { id: string };
}) {
  const ticket = await getTicket(params.id);
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className="ml-auto">
          {data.session?.user.email === ticket.user_email && (
            <DeleteButton id={ticket.id} />
          )}
        </div>
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
