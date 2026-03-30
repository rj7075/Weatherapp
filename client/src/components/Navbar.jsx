import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, CloudSun } from "lucide-react";


const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-700 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <CloudSun size={28} />

          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold cursor-pointer hover:opacity-80 transition"
            >
           
            <span>WeatherApp</span>
            </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-lg">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/historical" className="hover:text-gray-200">Historical</Link>
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden">
          {open ? (
            <X size={28} onClick={() => setOpen(false)} />
          ) : (
            <Menu size={28} onClick={() => setOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
  <div className="md:hidden bg-blue-700 h-screen flex flex-col justify-center items-center space-y-6 text-lg">
    <Link
      to="/"
      onClick={() => setOpen(false)}
      className="block text-center"
    >
      Home
    </Link>

    <Link
      to="/historical"
      onClick={() => setOpen(false)}
      className="block text-center"
    >
      Historical
    </Link>
  </div>
)}
    </nav>
  );
};

export default Navbar;