"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterOTP() {
  const [registerOtp, setRegisterOtp] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  async function handleRegisterOtp(event: FormEvent) {
    event.preventDefault();
    const res = await fetch(`${process.env.API_URL}/users/register/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: registerOtp }),
    });
    if (!res.ok) {
      const data = await res.json();
      setMessage(data.message);
    } else {
      router.push("/login");
    }
  }
  return (
    <form onSubmit={handleRegisterOtp} className="grid gap-4">
      <p className="text-center font-semibold text-red-600">{message}</p>
      <Label className="grid gap-1" htmlFor="otp">
        Register OTP
        <Input
          id="otp"
          type="text"
          onChange={(e) => setRegisterOtp(e.target.value)}
          value={registerOtp}
        />
      </Label>
      <Button>Register</Button>
      <Link href="/register" className="text-center text-sm underline">
        Go back
      </Link>
    </form>
  );
}
