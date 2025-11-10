import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { Switch, Route } from 'react-router-dom';
import Products from "./components/Products";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import ContactUs from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={Product} />
        <Route exact path="/About" component={About} />
        <Route exact path="/Contact" component={ContactUs} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/admin" component={AdminPanel} />
      </Switch>
    </>
  );
}

export default App;
