import * as React from "react";
import { useContext } from "react";
import { AuthContextType } from "types/auth";
import { AuthContext } from "@/context/AuthProvider";

export default function Home() {
  const auth: AuthContextType = useContext(AuthContext);
  console.log(auth);

  // End container content
  return (
    <p>
      {auth?.user?.family_name} {auth?.user?.first_name}
    </p>
  );
}
