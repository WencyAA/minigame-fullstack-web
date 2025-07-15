// GlobalNavigation.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../styles/globalNavigation.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faFileAlt,
  faImages,
  faCode,
  faCog,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

const GlobalNavigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: '首页', icon: faHome },
    { path: '/planning', label: '策划编辑', icon: faFileAlt },
    { path: '/assets', label: '素材生成', icon: faImages },
    { path: '/development', label: '程序草案', icon: faCode },
    { path: '/settings', label: '设置', icon: faCog },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl font-bold">M</span>
              </div>
              <span className="text-xl font-bold tracking-tight">MiniGame</span>
            </Link>
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map(({ path, label, icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out
                    flex items-center space-x-2 hover:scale-105 transform
                    ${
                      isActive(path)
                        ? 'bg-white text-blue-600 shadow-lg'
                        : 'text-white hover:bg-blue-500/30'
                    }
                  `}
                >
                  <FontAwesomeIcon icon={icon} className={`${isActive(path) ? 'text-blue-600' : 'text-white'}`} />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-blue-500/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">打开主菜单</span>
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faTimes : faBars}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                flex items-center space-x-3
                ${
                  isActive(path)
                    ? 'bg-white text-blue-600'
                    : 'text-white hover:bg-blue-500/30'
                }
              `}
            >
              <FontAwesomeIcon icon={icon} className={`${isActive(path) ? 'text-blue-600' : 'text-white'}`} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default GlobalNavigation;
