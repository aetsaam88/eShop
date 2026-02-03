"use client";
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    // EmailJS credentials (Ye aapko EmailJS ki website se milenge)
    emailjs.sendForm(
      'YOUR_SERVICE_ID', 
      'YOUR_TEMPLATE_ID', 
      form.current, 
      'YOUR_PUBLIC_KEY'
    )
    .then(() => {
        setStatus("Message Sent Successfully! ✅");
        e.target.reset();
    }, (error) => {
        setStatus("Failed to send message. ❌");
        console.log(error.text);
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-10 bg-white shadow-2xl rounded-3xl mt-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">Contact Us</h1>
      
      <form ref={form} onSubmit={sendEmail} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" name="user_name" required className="w-full p-3 border rounded-xl mt-1" placeholder="Your Name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" name="user_email" required className="w-full p-3 border rounded-xl mt-1" placeholder="email@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea name="message" required className="w-full p-3 border rounded-xl mt-1 h-32" placeholder="Write your message here..."></textarea>
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">
          Send Email
        </button>

        {status && <p className="text-center mt-4 font-semibold text-blue-600">{status}</p>}
      </form>
    </div>
  );
}