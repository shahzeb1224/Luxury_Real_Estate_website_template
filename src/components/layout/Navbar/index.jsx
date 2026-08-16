import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Menu, X, Search, User, Heart, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Container from '@/components/shared/Container';
import MobileMenu from '@/components/layout/MobileMenu';
import config from '@/constants/config';
import NAVIGATION from '@/constants/navigation';

const Navbar = ({ className = '', ...props }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';

  const navbarClasses = cn(
    'fixed top-0 left-0 right-0 z-[1000] transition-all duration-300',
    isScrolled
      ? 'bg-white shadow-nav py-2'
      : isHomePage
        ? 'bg-transparent py-4'
        : 'bg-white shadow-nav py-2',
    className
  );

  const linkClasses = cn(
    'text-sm font-medium transition-colors relative',
    isScrolled || !isHomePage
      ? 'text-navy-600 hover:text-navy-900'
      : 'text-white/90 hover:text-white'
  );

  const activeLinkClasses = cn(
    linkClasses,
    isScrolled || !isHomePage ? 'text-navy-900' : 'text-white'
  );

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className={`${navbarClasses} z-[1000]`} role="banner" {...props}>
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className={cn(
                'text-2xl font-playfair font-bold transition-colors',
                isScrolled || !isHomePage ? 'text-navy-800' : 'text-white'
              )}
              aria-label="Home"
            >
              Elite
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-8"
              role="navigation"
              aria-label="Main Navigation"
            >
              {NAVIGATION.main.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    isActive(item.href) ? activeLinkClasses : linkClasses,
                    'after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-gold-500 after:transition-transform after:duration-300',
                    isActive(item.href)
                      ? 'after:scale-x-100'
                      : 'after:scale-x-0 hover:after:scale-x-100'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* <Link
                to="/chat"
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  isScrolled || !isHomePage
                    ? 'text-navy-600 hover:bg-navy-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
                aria-label="Chat with us"
              >
                <MessageCircle className="w-5 h-5" />
              </Link> */}
              <Link
                to="/search"
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  isScrolled || !isHomePage
                    ? 'text-navy-600 hover:bg-navy-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
                aria-label="Search properties"
              >
                <Search className="w-5 h-5" />
              </Link>

              <Link
                to="/favorites"
                className={cn(
                  'p-2 rounded-lg transition-colors relative',
                  isScrolled || !isHomePage
                    ? 'text-navy-600 hover:bg-navy-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
                aria-label="Favorites"
              >
                <Heart className="w-5 h-5" />
                {/* Optional: Show favorite count badge */}
                {/* You can add a badge here if you want to show the count */}
              </Link>
              <Button variant="primary" size="sm" className="hidden sm:inline-flex">
                Sign In
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  'lg:hidden p-2 rounded-lg transition-colors',
                  isScrolled || !isHomePage
                    ? 'text-navy-600 hover:bg-navy-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default React.memo(Navbar);
