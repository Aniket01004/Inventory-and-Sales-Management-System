export function getAuth() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      token,
      username: payload.sub,
      role: payload.role,
    };
  } catch {
    return null;
  }
}