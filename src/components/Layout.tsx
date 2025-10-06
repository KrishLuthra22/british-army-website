import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

import BAOC_vertical_logo from "@/assets/BAOC_vertical_logo.png";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Calendar", href: "/calendar" },
    { name: "Results", href: "/results" },
    { name: "BAOC", href: "/baoc" },
    { name: "AOA", href: "/aoa" },
    { name: "News", href: "/news" },
    { name: "Gallery", href: "/gallery" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero shadow-military border-b border-border/20">
        <nav className="mx-auto  max-w-7xl px-4 sm:px-6 lg:px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-1">
                <img
                  className="h-12 w-12 rounded-lg ring-2 ring-white/20"
                  src={BAOC_vertical_logo}
                  alt="British Army Orienteering Club"
                />

                <div className="text-white">
                  <div className="text-3xl font-bold">British Army</div>
                  {/* <div className="text-sm opacity-90">Orienteering Club</div> */}
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-3 w-full flex items-baseline justify-end ">
                <div className="flex space-x-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? "bg-white/20 text-white shadow-lg"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:bg-white/10"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>

            <div className="ml-4 border border-white/20 rounded-xl bg-white/30">
              {isLoggedIn ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="px-8 py-2 rounded-md text-sm font-medium transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10 flex items-center space-x-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="px-8 py-2 rounded-md text-sm font-medium transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10"
                >
                  <Link to="/admin" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-white/20 text-white"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10 w-full text-left"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  className="h-10 w-10 rounded-lg"
                  src={BAOC_vertical_logo}
                  alt="British Army Orienteering Club"
                />
                <div>
                  <div className="font-bold">British Army</div>
                  <div className="text-sm opacity-90">Orienteering Club</div>
                </div>
              </div>
              <p className="text-sm opacity-80">
                The official home of Army Orienteering Association (AOA) and
                British Army Orienteering Club (BAOC).
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link
                    to="/calendar"
                    className="hover:opacity-100 transition-opacity"
                  >
                    Event Calendar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/results"
                    className="hover:opacity-100 transition-opacity"
                  >
                    Results
                  </Link>
                </li>
                <li>
                  <Link
                    to="/baoc"
                    className="hover:opacity-100 transition-opacity"
                  >
                    join BAOC
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aoa"
                    className="hover:opacity-100 transition-opacity"
                  >
                    AOA Information
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <p className="text-sm opacity-80">
                For more information about orienteering events, training
                courses, and membership.
              </p>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-60">
            <p>
              &copy; 2024 British Army Orienteering Club. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
