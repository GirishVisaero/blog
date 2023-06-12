import Container from "@/components/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import "../globals.css";


export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="">
    working
    </div>
  );
}