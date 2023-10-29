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
  revalidatePath("/tickets");
  redirect("/tickets");
}
