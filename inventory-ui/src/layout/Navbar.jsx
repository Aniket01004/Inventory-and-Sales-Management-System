import { UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  if (!auth) return null; // safety

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold text-gray-800">
        Inventory & Sales Management
      </h1>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
          <UserCircle size={20} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {auth.username} ({auth.role})
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;