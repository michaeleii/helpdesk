"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addTicket(formData: FormData) {
  const ticket = Object.fromEntries(formData);
  //get supabase instance
  const supabase = createServerActionClient({ cookies });

  //get current user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  //insert ticket into supabase
  const { error } = await supabase.from("ticket").insert({
    ...ticket,
    user_email: session?.user?.email,
  });
  if (error) {
    console.error(error);
    throw new Error("Could not add ticket.");
  }
  revalidatePath("/tickets");
  redirect("/tickets");
}

export async function deleteTicket(id: string) {
  //get supabase instance
  const supabase = createServerActionClient({ cookies });

  //delete ticket from supabase
  const { error } = await supabase.from("ticket").delete().eq("id", id);
  if (error) throw new Error("Could not delete ticket.");
  revalidatePath("/tickets");
  redirect("/tickets");
}
