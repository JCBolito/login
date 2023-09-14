"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    const res = await fetch(`${process.env.API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
      setMessage(data.message);
    } else {
      router.push("/login/otp");
    }
  }

  return (
    <form onSubmit={handleLogin} className="grid w-full max-w-2xl gap-4">
      <p className="text-center font-semibold text-red-600">{message}</p>
      <Label>
        Email
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </Label>
      <Label>
        Password
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </Label>
      <Button>Login</Button>
      <Link href="/register" className="text-center text-sm underline">
        Register
      </Link>
    </form>
  );
}
