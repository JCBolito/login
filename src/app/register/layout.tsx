"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("martin-login")) {
      router.push("/home");
    } else {
      setLoading(false);
    }
  });
  //   if (localStorage.getItem("martin-login")) {
  if (loading) {
    return (
      <main className="flex h-screen flex-col items-center justify-center gap-4 p-4">
        <Loader />
      </main>
    );
  }
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-center text-2xl font-bold">Register</h1>
      {children}
    </main>
  );
}
