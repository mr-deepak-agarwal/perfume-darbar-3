"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Login() {
  const r = useRouter(); const [signup, setSignup] = useState(false);
  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <h1 className="text-4xl">{signup ? "Create your account" : "Sign in"}</h1>
      <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); r.push("/account"); }}>
        {signup && <input required className="field" placeholder="Full name" aria-label="Full name" />}
        <input required type="email" className="field" placeholder="Email" aria-label="Email" />
        <input required type="password" className="field" placeholder="Password" aria-label="Password" />
        <button className="btn w-full">{signup ? "Create account" : "Sign in"}</button>
      </form>
      <button onClick={() => setSignup(!signup)} className="mt-5 text-sm underline underline-offset-4">{signup ? "I already have an account" : "New here? Create an account"}</button>
      <p className="mt-6 text-xs text-ink/50">Demo: any email and password works. <Link href="/account" className="underline">Skip to account</Link></p>
    </div>
  );
}
