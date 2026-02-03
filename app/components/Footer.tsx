import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Section 1: Brand/About */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-white text-2xl font-bold mb-4">E-SHOP</h2>
            <p className="text-sm leading-relaxed">
“Your favorite products are now just one click away. We provide the best quality and fast delivery.” ✅            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><Link href="/shop" className="hover:text-blue-400 transition">Shop</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Section 3: Customer Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-blue-400 transition">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-blue-400 transition">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-blue-400 transition">Returns & Refunds</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Section 4: Newsletter/Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact Us</h3>
            <p className="text-sm mb-2">Email: support@eshop.com</p>
            <p className="text-sm mb-4">Phone: +92 300 1234567</p>
            <div className="flex space-x-4">
              {/* Social Media Placeholder Icons */}
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">F</div>
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-400 cursor-pointer transition">T</div>
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-pink-600 cursor-pointer transition">I</div>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-slate-800 pt-6 text-center">
          <p className="text-xs">
            © {new Date().getFullYear()} E-SHOP. All rights reserved. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;