import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavigationBar from "./Components/NavigationBar";
import Products from "./Components/Products";

export const Context = createContext();
function App() {
  const [login, setLogin] = useState(false);
  let [logger, setLogger] = useState("");
  let [cartQuan, setCartQuan] = useState(0);
  let [cart, setCart] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <Context.Provider
          value={{
            login,
            setLogin,
            logger,
            setLogger,
            cartQuan,
            setCartQuan,
            cart,
            setCart,
          }}
        >
          <Routes>
            <Route path="/" element={<NavigationBar />}>
              <Route path="/" element={<Products />} />
            </Route>
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
