import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      to: "/vendor/Profile",
      label: "Profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12zm0 1.5c-3.315 0-6 2.015-6 4.5V21h12v-3c0-2.485-2.685-4.5-6-4.5z"
          />
        </svg>
      ),
    },
    {
      to: "/vendor/Products",
      label: "Products",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 16V8a2 2 0 00-1.106-1.789l-7-3.5a2 2 0 00-1.788 0l-7 3.5A2 2 0 003 8v8a2 2 0 001.106 1.789l7 3.5a2 2 0 001.788 0l7-3.5A2 2 0 0021 16z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
          />
        </svg>
      ),
    },
    
    {
      to: "/vendor/Orders",
      label: "Orders",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6H19M7 13l-4-8"
          />
        </svg>
      ),
    },
    {
      to: "/vendor/Payments",
      label: "Payments",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <rect x="2.25" y="4.5" width="19.5" height="15" rx="2.25" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 9h19.5" />
        </svg>
      ),
    },
    {
      to: "/vendor/Reviews",
      label: "Reviews",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.09 5.26a.563.563 0 00.475.349l5.556.404a.562.562 0 01.312.98l-4.213 3.63a.562.562 0 00-.182.557l1.278 5.403a.562.562 0 01-.84.61L12 18.557l-4.017 2.535a.562.562 0 01-.84-.61l1.278-5.402a.562.562 0 00-.182-.558L4.026 10.49a.562.562 0 01.312-.98l5.556-.404a.562.562 0 00.475-.349l2.09-5.258z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-56 bg-black text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="p-4 text-lg font-bold text-center md:text-left text-brand-orange border-b border-gray-800">
          Vendor
        </div>
        <nav className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-brand-orange text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`
              }
              onClick={() => setIsOpen(false)} // close menu on click (mobile)
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
          {/* Hamburger Icon */}
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
