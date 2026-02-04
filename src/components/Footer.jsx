import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-bold">Riotous Car Care</span>
            <p className="mt-4 text-gray-400 text-sm">
              Premium automotive detailing, paint correction, protection and ceramic coating.
            </p>
          </div>

          <div>
            <span className="font-semibold text-lg">Quick Links</span>
            <div className="mt-4 space-y-2">
              <Link to="/services" className="block text-gray-400 hover:text-primary transition-colors text-sm">
                Services
              </Link>
              <Link to="/booking" className="block text-gray-400 hover:text-primary transition-colors text-sm">
                Book Now
              </Link>
              <Link to="/fleet" className="block text-gray-400 hover:text-primary transition-colors text-sm">
                Fleet Services
              </Link>
            </div>
          </div>

          <div>
            <span className="font-semibold text-lg">Contact</span>
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>630.320.6815</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@riotouscarcare.com</span>
              </div>
            </div>
          </div>

          <div>
            <span className="font-semibold text-lg">Follow Us</span>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Riotous Car Care. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;