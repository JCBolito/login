"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Register() {
  const [email, setEmail] = useState("");
  const [reEmail, setReEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    if (email == reEmail && password == rePassword) {
      console.log(email, reEmail, password, rePassword);

      const res = await fetch(`${process.env.API_URL}/users/register`, {
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
      }
      router.push("/register/otp");
    }
  }

  return (
    <form onSubmit={handleRegister} className="grid w-full max-w-2xl gap-4">
      <p className="text-center font-semibold text-red-600">{message}</p>
      <Label htmlFor="email">
        Email
        <Input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </Label>
      <Label htmlFor="reEmail">
        Re-enter Email
        <Input
          type="email"
          id="reEmail"
          onChange={(e) => setReEmail(e.target.value)}
          value={reEmail}
        />
        <span className="text-xs text-red-600">
          {email != reEmail && "Emails do not match."}
        </span>
      </Label>
      <Label htmlFor="password">
        Password
        <Input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </Label>
      <Label htmlFor="rePassword">
        Re-enter Password
        <Input
          type="password"
          id="rePassword"
          onChange={(e) => setRePassword(e.target.value)}
          value={rePassword}
        />
        <span className="text-xs text-red-600">
          {password != rePassword && "Passwords do not match."}
        </span>
      </Label>
      <Button>Register</Button>
      <Link href="/login" className="text-center text-sm underline">
        Login
      </Link>
    </form>
  );
}
