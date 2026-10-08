"use client";
import { useState } from "react";
export default function Contact() {
  const [sent, setSent] = useState(false);
  return (<div className="mx-auto grid max-w-5xl gap-12 px-5 py-14 md:grid-cols-2"><div><h1 className="text-5xl">Contact us</h1><p className="mt-4 text-ink/70">Questions about an order or picking a scent? We reply within one working day.</p>
    <dl className="mt-8 space-y-4 text-sm"><div><dt className="font-semibold">Email</dt><dd>care@perfumedarbar.in</dd></div><div><dt className="font-semibold">Phone</dt><dd>+91 98765 43210 (10am to 7pm, Mon to Sat)</dd></div><div><dt className="font-semibold">Studio</dt><dd>12 MI Road, C-Scheme, Jaipur 302001</dd></div></dl></div>
    {sent ? <div className="h-fit rounded-2xl bg-white p-8"><h2 className="text-3xl">Message sent</h2><p className="mt-2 text-ink/70">Thanks. We'll get back to you shortly.</p></div>
      : <form className="space-y-4 rounded-2xl bg-white p-8" onSubmit={(e) => { e.preventDefault(); setSent(true); }}><input required className="field" placeholder="Your name" aria-label="Name" /><input required type="email" className="field" placeholder="Email" aria-label="Email" /><textarea required rows={5} className="field" placeholder="How can we help?" aria-label="Message" /><button className="btn w-full">Send message</button></form>}</div>);
}
