const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">

        <h2 className="text-lg font-semibold text-white mb-2">
          🌤 Weather App
        </h2>

        <p className="text-sm">
          Get real-time weather updates and forecasts.
        </p>

        <p className="text-xs mt-3 text-gray-400">
          © {new Date().getFullYear()} Ranjeet Yadav. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;