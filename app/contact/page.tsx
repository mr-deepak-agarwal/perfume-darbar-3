"use client";
import { useState } from "react";
export default function Contact() {
  const [sent, setSent] = useState(false);
  return (<div className="mx-auto grid max-w-5xl gap-12 px-5 py-14 md:grid-cols-2"><div><h1 className="text-6xl">Say hello</h1><p className="mt-4 text-lg">Questions about an order or picking a scent? We reply within one working day.</p>
    <dl className="mt-8 space-y-4"><div><dt className="font-bold">Email</dt><dd>hello@perfumedarbar.in</dd></div><div><dt className="font-bold">Phone</dt><dd>+91 98765 43210 (10am to 7pm, Mon to Sat)</dd></div><div><dt className="font-bold">Studio</dt><dd>12 MI Road, C-Scheme, Jaipur 302001</dd></div></dl></div>
    {sent ? <div className="h-fit border-2 border-ink bg-lemon p-8 shadow-[6px_6px_0_#0b1020]"><h2 className="text-4xl">Message sent</h2><p className="mt-2">Thanks. We'll get back to you shortly.</p></div>
      : <form className="space-y-4 border-2 border-ink p-8 shadow-[6px_6px_0_#0b1020]" onSubmit={(e) => { e.preventDefault(); setSent(true); }}><input required className="field" placeholder="Your name" aria-label="Name" /><input required type="email" className="field" placeholder="Email" aria-label="Email" /><textarea required rows={5} className="field" placeholder="How can we help?" aria-label="Message" /><button className="btn w-full">Send message</button></form>}</div>);
}
