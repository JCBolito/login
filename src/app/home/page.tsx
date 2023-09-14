"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>("");
  useEffect(() => {
    const rawData = localStorage.getItem("martin-login");
    if (rawData) {
      const data = JSON.parse(rawData);
      setUser(data.email);
    } else {
      router.push("/login");
    }
  }, []);
  console.log(user);

  function handleLogout() {
    localStorage.removeItem("martin-login");
    router.push("/login");
  }
  if (!user) {
    return (
      <main className="flex h-screen flex-col items-center justify-center gap-4 p-4">
        <Loader />
      </main>
    );
  }
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4 p-4">
      <h1>Hello, {user}</h1>
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </main>
  );
}
