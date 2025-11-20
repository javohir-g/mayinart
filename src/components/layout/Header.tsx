import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";

interface HeaderProps {
  isVisible?: boolean;
}

export default function Header({ isVisible = true }: HeaderProps) {
  const location = useLocation();
  const { itemCount, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Catalog", path: "/catalog" },
    { name: "Contact", path: "#" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <nav className="container mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
        {/* Hamburger Menu Button - Always Visible */}
        <button
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" onClick={closeMenu}>
            <img
              src="/src/assets/logos/MAYIN.png"
              alt="MAYIN"
              className="h-[36px] w-auto"
            />
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-6 h-6" />
          </button>
          <button
            onClick={openCart}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-['Outfit'] font-medium">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Menu Overlay - Always available when open */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              link.path === "#" ? (
                <a
                  key={link.name}
                  href="#"
                  className="px-8 py-3 font-['Outfit'] font-normal text-[20px] text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                  onClick={closeMenu}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-8 py-3 font-['Outfit'] font-normal text-[20px] transition-colors hover:bg-gray-50 ${isActive(link.path)
                      ? "text-black bg-gray-50"
                      : "text-gray-600 hover:text-black"
                    }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
