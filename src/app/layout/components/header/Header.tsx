import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm w-full flex">
      <SidebarTrigger />
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-semibold">MyApp</div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className="text-gray-700 hover:text-black">
            Home
          </NavLink>
          <NavLink to="/about" className="text-gray-700 hover:text-black">
            About
          </NavLink>
          <NavLink to="/services" className="text-gray-700 hover:text-black">
            Services
          </NavLink>
          <NavLink to="/contact" className="text-gray-700 hover:text-black">
            Contact
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Close" : "Menu"}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-black"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-black"
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-black"
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-black"
            >
              Contact
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
