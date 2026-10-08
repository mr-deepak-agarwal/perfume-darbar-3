"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Track() {
  const r = useRouter(); const [id, setId] = useState("");
  return (<div className="mx-auto max-w-md px-5 py-20"><h1 className="text-5xl">Track your order</h1><p className="mt-3 text-ink/70">Enter the order number from your confirmation email. Try PD482913.</p>
    <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); r.push(`/order/${id.trim().toUpperCase()}`); }}><input required className="field" placeholder="Order number" aria-label="Order number" value={id} onChange={(e) => setId(e.target.value)} /><button className="btn w-full">Track order</button></form></div>);
}
