"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Login() {
  const r = useRouter(); const [up, setUp] = useState(false);
  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <h1 className="text-6xl">{up ? "Join Perfume Darbar" : "Welcome back"}</h1>
      <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); r.push("/account"); }}>
        {up && <input required className="field" placeholder="Full name" aria-label="Full name" />}
        <input required type="email" className="field" placeholder="Email" aria-label="Email" />
        <input required type="password" className="field" placeholder="Password" aria-label="Password" />
        <button className="btn w-full">{up ? "Create account" : "Sign in"}</button>
      </form>
      <button onClick={() => setUp(!up)} className="mt-5 text-sm font-semibold underline">{up ? "I already have an account" : "New here? Create an account"}</button>
      <p className="mt-6 text-xs text-ink/50">Demo: any email works. <Link href="/account" className="underline">Skip to account</Link></p>
    </div>
  );
}
