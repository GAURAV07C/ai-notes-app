import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { signOutAction } from "@/app/actions";

const Logout = () => {
  return (
    <div>
      <form action={signOutAction}>
        <Button type="submit" variant={"ghost"}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </form>
    </div>
  );
}

export default Logout
