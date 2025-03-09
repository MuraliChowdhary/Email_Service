import { Link } from 'react-router-dom';
import  React, { useState, useEffect } from 'react';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary-600">AI Email</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium text-secondary-600 hover:text-primary-600 transition-colors">
            Home
          </Link>
          <Link to="#features" className="font-medium text-secondary-600 hover:text-primary-600 transition-colors">
            Features
          </Link>
          <Link to="#how-it-works" className="font-medium text-secondary-600 hover:text-primary-600 transition-colors">
            How It Works
          </Link>
          <Link to="/generate" className="btn-primary">
            Generate Email
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-secondary-800 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiOutlineMenuAlt3 className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pb-6 px-4">
          <div className="flex flex-col space-y-4 pt-2">
            <Link 
              to="/" 
              className="font-medium text-secondary-600 hover:text-primary-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="#features" 
              className="font-medium text-secondary-600 hover:text-primary-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="#how-it-works" 
              className="font-medium text-secondary-600 hover:text-primary-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/generate" 
              className="btn-primary text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Generate Email
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;