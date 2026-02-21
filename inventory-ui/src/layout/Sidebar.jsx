import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ChevronDown
} from "lucide-react";

function Sidebar({ role }) {
  const [openProducts, setOpenProducts] = useState(false);
  const [openSales, setOpenSales] = useState(false);

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col p-4 min-h-screen">

      <h2 className="text-lg font-bold mb-6">
        {role === "ADMIN" ? "Admin Panel" : "Staff Panel"}
      </h2>

      {/* Dashboard */}
      {role === "ADMIN" && (
  <Link
    to="/dashboard"
    className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 mb-4"
  >
    <LayoutDashboard size={18} />
    Dashboard
  </Link>
)}

      {/* Products */}
      <div className="mb-4">
        <button
          onClick={() => setOpenProducts(!openProducts)}
          className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-800"
        >
          <div className="flex items-center gap-2">
            <Package size={18} />
            Products
          </div>
          <ChevronDown size={16} />
        </button>

        {openProducts && (
          <div className="ml-6 mt-2 flex flex-col gap-2 text-sm text-gray-300">

            {/* ADMIN ONLY */}
            {role === "ADMIN" && (
              <>
                <Link to="/products/add" className="hover:text-white">
                  Add Product
                </Link>
                <Link to="/products/update" className="hover:text-white">
                  Update Product
                </Link>
              </>
            )}

            {/* BOTH */}
            <Link to="/products" className="hover:text-white">
              View Products
            </Link>

            <Link to="/products/low-stock" className="hover:text-white">
              Low Stock
            </Link>

          </div>
        )}
      </div>

      {/* Sales */}
      <div>
        <button
          onClick={() => setOpenSales(!openSales)}
          className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-800"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} />
            Sales
          </div>
          <ChevronDown size={16} />
        </button>

        {openSales && (
          <div className="ml-6 mt-2 flex flex-col gap-2 text-sm text-gray-300">

            <Link to="/sales/create" className="hover:text-white">
              Create Sale
            </Link>

            <Link to="/sales/view" className="hover:text-white">
              View Sales
            </Link>

            {/* ADMIN ONLY REPORTS */}
            {role === "ADMIN" && (
              <>
                <Link to="/sales/daily" className="hover:text-white">
                  Daily Report
                </Link>
                <Link to="/sales/monthly" className="hover:text-white">
                  Monthly Report
                </Link>
              </>
            )}

          </div>
        )}
      </div>

    </div>
  );
}

export default Sidebar;
