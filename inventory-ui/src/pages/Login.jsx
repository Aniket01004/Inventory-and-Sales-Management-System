import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password }
      );

      const { token } = response.data;

      if (!token) {
        throw new Error("Invalid login response");
      }

      // ✅ Only store token
     // Store token
localStorage.setItem("token", token);

// Decode role from token
const payload = JSON.parse(atob(token.split(".")[1]));
const role = payload.role;

if (role === "ADMIN") {
  navigate("/dashboard", { replace: true });
} else {
  navigate("/sales/create", { replace: true });
}

    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">

      <div className="w-full max-w-md">

        <div className="text-center mb-8 text-white">
          <div className="flex justify-center mb-3">
            <div className="bg-blue-600 p-3 rounded-full">📦</div>
          </div>
          <h1 className="text-3xl font-bold">
            Inventory & Sales Management
          </h1>
          <p className="text-gray-300 mt-2">
            Secure Business Dashboard
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8">

          <h2 className="text-xl font-semibold mb-6 text-center">
            Sign In
          </h2>

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border rounded p-2 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex justify-center items-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign In"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;