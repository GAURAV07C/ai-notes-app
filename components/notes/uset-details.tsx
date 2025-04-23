import React from 'react'
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
const UserDetails = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/sign-in");
    }
  return (
    <div>
      {user.email?.split("@")[0]}
    </div>
  )
}

export default UserDetails
