import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-brand-orange text-white p-4 flex items-center justify-between">
      {/* Empty spacer to balance the flexbox */}
      <div className="w-1/3"></div>

      {/* Brand name centered */}
      <div className="w-1/3 flex flex-col items-center">
        
        <span className="text-3xl font-extrabold text-black">DripMart</span>
      </div>

      {/* Nav links on the right */}
      <div className="w-1/3 flex justify-end space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/signup" className="hover:underline">
          Signup
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
