import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPanel = () => {
  const demoCredentials = { email: "admin@demo.com", password: "admin123" };

  // ---------- Authentication ----------
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ---------- Sidebar view ----------
  const [view, setView] = useState("dashboard");

  // ---------- Products ----------
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ---------- New Product form ----------
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  // ---------- Users ----------
  const [users, setUsers] = useState([]);

  // ---------- Orders ----------
  const [orders, setOrders] = useState([]);

  // ---------- Persist login ----------
  useEffect(() => {
    const auth = localStorage.getItem("isAdminAuthenticated");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  // ---------- Load demo data ----------
  useEffect(() => {
    if (!isAuthenticated) return;

    const loadDemoData = async () => {
      // Products (first 5 from API)
      const res = await fetch("https://fakestoreapi.com/products?limit=5");
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);

      // Categories
      const categoryRes = await fetch("https://fakestoreapi.com/products/categories");
      const categoryData = await categoryRes.json();
      setCategories(["all", ...categoryData]);

      // Demo users
      setUsers([
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ]);

      // Demo orders
      setOrders([
        { id: 1, user: "John Doe", product: "Fjallraven Backpack", total: 109.95, status: "Pending" },
        { id: 2, user: "Jane Smith", product: "Mens Cotton Jacket", total: 55.99, status: "Delivered" },
      ]);
    };

    loadDemoData();
  }, [isAuthenticated]);

  // ---------- Filter products ----------
  useEffect(() => {
    if (selectedCategory === "all") setFilteredProducts(products);
    else setFilteredProducts(products.filter((p) => p.category === selectedCategory));
  }, [selectedCategory, products]);

  // ---------- Login ----------
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email === demoCredentials.email && password === demoCredentials.password) {
      setIsAuthenticated(true);
      localStorage.setItem("isAdminAuthenticated", "true");
      setView("dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  // ---------- Demo login ----------
  const handleDemoLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAdminAuthenticated", "true");
    setView("dashboard");
  };

  // ---------- Logout ----------
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAdminAuthenticated");
  };

  // ---------- CRUD Products ----------
  const handleAddProduct = (e) => {
    e.preventDefault();
    const newItem = { id: Date.now(), ...newProduct, price: parseFloat(newProduct.price) };
    setProducts([newItem, ...products]);
    setNewProduct({ title: "", price: "", category: "", image: "" });
  };

  const handleEditProduct = (id) => {
    const updatedTitle = prompt("Enter new title:");
    const updatedPrice = prompt("Enter new price:");
    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, title: updatedTitle || p.title, price: updatedPrice ? parseFloat(updatedPrice) : p.price }
          : p
      )
    );
  };

  const handleDeleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));

  // ---------- CRUD Users ----------
  const handleAddUser = () => {
    const name = prompt("Enter user name:");
    const email = prompt("Enter user email:");
    if (name && email) {
      const newUser = { id: Date.now(), name, email };
      setUsers([newUser, ...users]);
    }
  };

  const handleEditUser = (id) => {
    const updatedName = prompt("Enter new name:");
    const updatedEmail = prompt("Enter new email:");
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, name: updatedName || u.name, email: updatedEmail || u.email } : u
      )
    );
  };

  const handleDeleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

  // ---------- CRUD Orders ----------
  const handleEditOrder = (id) => {
    const updatedStatus = prompt("Enter new status (Pending / Delivered / Cancelled):");
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: updatedStatus || o.status } : o)));
  };

  const handleDeleteOrder = (id) => setOrders(orders.filter((o) => o.id !== id));

  // ---------- Login screen ----------
  if (!isAuthenticated) {
    return (
      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Admin Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" name="email" className="form-control" required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
        </form>
        <button className="btn btn-secondary w-100" onClick={handleDemoLogin}>Demo Login</button>
      </div>
    );
  }

  // ---------- Admin Panel ----------
  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        {/* Sidebar */}
        <div className="col-md-2 bg-dark text-white p-3 min-vh-100">
          <h4 className="text-center mb-4">Admin Panel</h4>
          <ul className="nav flex-column">
            <li className={`nav-item mb-2 ${view === "dashboard" ? "fw-bold" : ""}`} onClick={() => setView("dashboard")} style={{ cursor: "pointer" }}>Dashboard</li>
            <li className={`nav-item mb-2 ${view === "products" ? "fw-bold" : ""}`} onClick={() => setView("products")} style={{ cursor: "pointer" }}>Products</li>
            <li className={`nav-item mb-2 ${view === "users" ? "fw-bold" : ""}`} onClick={() => setView("users")} style={{ cursor: "pointer" }}>Users</li>
            <li className={`nav-item mb-2 ${view === "orders" ? "fw-bold" : ""}`} onClick={() => setView("orders")} style={{ cursor: "pointer" }}>Orders</li>
            <li className="nav-item mt-4" onClick={handleLogout} style={{ cursor: "pointer" }}>Sign Out</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          {/* Dashboard */}
          {view === "dashboard" && (
            <div>
              <h2>Dashboard</h2>
              <div className="row mt-4 g-3">
                <div className="col-md-3">
                  <div className="card p-3 shadow-sm text-center">
                    <h5>Total Users</h5>
                    <p>{users.length}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card p-3 shadow-sm text-center">
                    <h5>Total Sales</h5>
                    <p>${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card p-3 shadow-sm text-center">
                    <h5>Total Products</h5>
                    <p>{products.length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Section */}
          {view === "products" && (
            <div>
              <h2>Products Management</h2>
              <div className="mb-3 d-flex align-items-center gap-3">
                <label className="form-label fw-bold mb-0">Filter by Category:</label>
                <select
                  className="form-select w-auto"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>

              {/* Add Product Form */}
              <form className="mb-3 d-flex gap-2" onSubmit={handleAddProduct}>
                <input type="text" placeholder="Title" className="form-control" value={newProduct.title} onChange={(e) => setNewProduct({...newProduct, title: e.target.value})} required />
                <input type="number" placeholder="Price" className="form-control" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} required />
                <input type="text" placeholder="Category" className="form-control" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} required />
                <input type="text" placeholder="Image URL" className="form-control" value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} required />
                <button type="submit" className="btn btn-success">Add</button>
              </form>

              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id}>
                      <td><img src={p.image} alt={p.title} width="50" height="50" style={{ objectFit: "contain" }}/></td>
                      <td>{p.title}</td>
                      <td>${p.price}</td>
                      <td>{p.category}</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditProduct(p.id)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Users Section */}
          {view === "users" && (
            <div>
              <h2>Users Management</h2>
              <button className="btn btn-success mb-3" onClick={handleAddUser}>Add New User</button>
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditUser(u.id)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(u.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Orders Section */}
          {view === "orders" && (
            <div>
              <h2>Recent Orders</h2>
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Product</th>
                    <th>Total ($)</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>{o.id}</td>
                      <td>{o.user}</td>
                      <td>{o.product}</td>
                      <td>{o.total}</td>
                      <td>{o.status}</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditOrder(o.id)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteOrder(o.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
