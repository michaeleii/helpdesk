import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const supabase = createRouteHandlerClient({ cookies });
  const { error } = await supabase.from("tickets").delete().match({ id });
  return NextResponse.json({ error });
}
