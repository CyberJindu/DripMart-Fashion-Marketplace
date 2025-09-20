import { NavLink, Outlet } from "react-router-dom";
import {
  User,
  Package,
  ShoppingCart,
  CreditCard,
  Star,
} from "lucide-react";

function VendorLayout() {
  const navItems = [
    { to: "/vendor/profile", label: "Profile", icon: <User size={20} /> },
    { to: "/vendor/products", label: "Products", icon: <Package size={20} /> },
    { to: "/vendor/orders", label: "Orders", icon: <ShoppingCart size={20} /> },
    { to: "/vendor/payments", label: "Payments", icon: <CreditCard size={20} /> },
    { to: "/vendor/reviews", label: "Reviews", icon: <Star size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-20 md:w-56 bg-black text-white flex flex-col">
        <div className="p-4 text-xl font-bold text-center md:text-left text-brand-orange">
          Vendor
        </div>
        <nav className="flex-1 flex flex-col gap-2 p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition ${
                  isActive
                    ? "bg-brand-orange text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`
              }
            >
              {item.icon}
              <span className="hidden md:inline">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default VendorLayout;
