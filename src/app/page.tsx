"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import Link from "next/link";
export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("martin-login")) {
      router.push("/home");
    } else {
      setLoading(false);
    }
  });
  if (loading) {
    return (
      <main className="flex h-screen flex-col items-center justify-center gap-4 p-4">
        <Loader />
      </main>
    );
  }
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <div>
        <p className="text-center font-bold">Hi, I'm Mark Dave Martin!</p>
        <p className="text-center">Welcome to my site!</p>
      </div>
      <section className="flex gap-4">
        <Link href="/login" className="underline">
          Login
        </Link>
        <Link href="/register" className="underline">
          Register
        </Link>
      </section>
    </main>
  );
}
