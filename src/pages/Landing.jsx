import { Link } from "react-router-dom";
import background from "../assets/background.png"; // make sure background.png is inside assets folder

function Landing() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="ml-12 max-w-lg text-left">
        <h3 className="text-lg font-bold text-gray-700 mb-2">Welcome to</h3>
        
        <h1 className="text-6xl font-extrabold text-black mb-4">DripMart</h1>
        <p className="text-md text-gray-800 mb-8">
          The best marketplace for selling and buying your most attractive fashion products
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-brand-orange text-white rounded-lg shadow hover:bg-orange-600"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-gray-800"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
