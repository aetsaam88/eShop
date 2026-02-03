export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-10 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">About Our Store</h1>
      <p className="text-lg text-slate-600 leading-relaxed">
        Welcome to MyStore! We provide the best quality products at affordable prices. 
        Our mission is to make online shopping easy and reliable for everyone.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h3 className="font-bold text-xl">High Quality</h3>
          <p className="text-sm text-gray-500">Premium products only.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h3 className="font-bold text-xl">Fast Delivery</h3>
          <p className="text-sm text-gray-500">Quick shipping to your door.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h3 className="font-bold text-xl">24/7 Support</h3>
          <p className="text-sm text-gray-500">We are always here to help.</p>
        </div>
      </div>
    </div>
  );
}