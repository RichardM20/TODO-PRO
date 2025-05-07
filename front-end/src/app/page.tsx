import { redirect } from "next/navigation";

export default function RootDirect() {
  redirect("/login");
}
