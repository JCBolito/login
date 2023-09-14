"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginOTP() {
  const [loginOtp, setLoginOtp] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  async function handleRegisterOtp(event: FormEvent) {
    event.preventDefault();
    const res = await fetch(`${process.env.API_URL}/users/login/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: loginOtp }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.message);
    } else {
      localStorage.setItem("martin-login", JSON.stringify(data.data));
      router.push("/home");
    }
  }
  return (
    <form onSubmit={handleRegisterOtp} className="grid gap-4">
      <p className="text-center font-semibold text-red-600">{message}</p>
      <Label className="grid gap-1" htmlFor="otp">
        Login OTP
        <Input
          id="otp"
          type="text"
          onChange={(e) => setLoginOtp(e.target.value)}
          value={loginOtp}
        />
      </Label>
      <Button>Login</Button>
      <Link href="/login" className="text-center text-sm underline">
        Go back
      </Link>
    </form>
  );
}
