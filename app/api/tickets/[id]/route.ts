import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:4000/tickets/${params.id}`);
  const tickets = await res.json();
  if (!res.ok)
    return NextResponse.json(
      { error: "Cannot find the ticket" },
      { status: 404 }
    );
  return NextResponse.json(tickets, { status: 200 });
}
