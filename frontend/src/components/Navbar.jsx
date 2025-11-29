import { Link } from "react-router-dom";
export default function Navbar() {
  const token = localStorage.getItem("token");
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = '/';
  };
  return (
    <nav style={{ padding: 12, background: "#222", color: "#fff", display: 'flex', gap:12 }}>
      <Link to="/" style={{ color: "#fff", fontWeight: 'bold' }}>ClothingBrand</Link>
      <Link to="/cart" style={{ color: "#fff" }}>Cart</Link>
      {token ? (
        <>
          <Link to="/orders" style={{ color: "#fff" }}>Orders</Link>
          <button onClick={logout} style={{ marginLeft: 12 }}>Logout</button>
        </>
      ) : (
        <Link to="/login" style={{ color: "#fff" }}>Login</Link>
      )}
    </nav>
  );
}
