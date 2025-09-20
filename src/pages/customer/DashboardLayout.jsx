import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      to: "/customer/Home",
      label: "Market",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 9.75V21h18V9.75M2.25 9.75l1.5-6h16.5l1.5 6M8.25 21v-6h7.5v6"
          />
        </svg>
      ),
    },
    {
      to: "/customer/Cart",
      label: "Cart",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6H19M7 13l-4-8"
          />
        </svg>
      ),
    },
    {
      to: "/customer/orders",
      label: "Orders",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.25 7.5l-8.954 8.955c-.44.439-1.152.439-1.591 0L3.75 11.5"
          />
        </svg>
      ),
    },
    {
      to: "/customer/Profile",
      label: "Profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12zm0 1.5c-3.3 0-6 2-6 4.5V21h12v-3c0-2.5-2.7-4.5-6-4.5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-56 bg-black text-white transform transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-4 text-lg font-bold text-center md:text-left text-brand-orange border-b border-gray-800">
          Customer
        </div>
        <nav className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive ? "bg-brand-orange text-white" : "hover:bg-gray-800 text-gray-300"
                }`
              }
              onClick={() => setIsOpen(false)} // close menu on mobile
            >
              {item.icon}
              <span className="md:inline">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-brand-orange text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-56 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
