import React, { useContext, useEffect, useState } from "react";
import "./Products.css";
import products from "../Products.json";
import StarIcon from "@mui/icons-material/Star";
import $ from "jquery";
import { Context } from "../App";
import { Alert, Snackbar } from "@mui/material";

const Products = () => {
  const pro = useContext(Context);

  // states
  let [proData, setProData] = useState(products);
  let [snack, setSnack] = useState({
    open: false,
    html: "",
    severity: "info",
  });
  let [filters, setFilters] = useState({
    search: "",
    price: "",
    category: "all",
  });

  //------working of filters------//
  useEffect(() => {
    setProData([
      ...products
        .filter((val) => {
          return val.name.toLowerCase().indexOf(filters.search) > -1;
        })
        .filter((val) => {
          return (
            filters.category === "all" ||
            val.category.toLowerCase() === filters.category.toLowerCase()
          );
        })
        .sort((a, b) => {
          return filters.price !== ""
            ? filters.price === "low-to-high"
              ? a.price - b.price
              : b.price - a.price
            : "";
        }),
    ]);
  }, [filters]);

  //------Price Filter-------//
  const priceFilter = (e) => {
    let fil = e.target.value;
    setFilters({ ...filters, price: fil });
  };

  // <------Category Filter------->
  const category = (e) => {
    let cat = e.target.value;
    console.log(cat);
    setFilters({ ...filters, category: cat });
  };

  console.log(products);

  //-----Clear Filter-------//
  const clrFilter = (e) => {
    setFilters({ search: "", price: "", category: "all" });
    $(e.target).parent().prev().children()[0].value = -1;
 
    $(e.target).parent().parent().children()[1].value = 'all';
  };

  //-------Function to add products to cart-------//
  const addCart = (e) => {
    let click = e.target.closest(".productCard").id;
    products.forEach((item) => {
      if (item.id == click) {
        item.cart += 1;
        item.discountedPrice = (
          item.price -
          (item.discount * item.price) / 100
        ).toFixed(2);
        item.totalPrice = +item.discountedPrice * +item.cart;
        pro.setCartQuan(++pro.cartQuan);
        pro.setCart([...pro.cart, item]);
        setSnack({
          open: true,
          html: "Product added to cart",
          severity: "success",
        });
      }
    });
  };

  //-------Function to remove products from cart-------//
  const removeCart = (e) => {
    let click = e.target.closest(".productCard").id;
    let i;
    products.find((item) => {
      if (item.id === +click)
        pro.cart.find((val, inx) => {
          i = inx;
        });
      return item.id === +click;
    }).cart = 0;
    pro.cart.splice(i, 1);
    pro.setCartQuan(--pro.cartQuan);
    setSnack({
      open: true,
      html: "Product removed from cart",
      severity: "error",
    });
  };

  //-------Function to increase the quantity of the product-------//
  const increment = (e) => {
    let click = e.target.closest(".productCard").id;
    products.forEach((item) => {
      if (item.id == click) {
        item.cart += 1;
        pro.setCartQuan(++pro.cartQuan);
      }
    });
  };

  //-------Function to decrease the quantity of the product-------//
  const decrement = (e) => {
    let click = e.target.closest(".productCard").id;
    products.forEach((item) => {
      if (item.id == click) {
        if (item.cart !== 1) {
          item.cart -= 1;
          pro.setCartQuan(--pro.cartQuan);
        } else return;
      }
    });
  };
  return (
    <>
      <div className="productSec">
        {/* <--------Filters Division---------> */}
        <div className="filters">
          {/* Category Filter */}
          <h3 style={{ textAlign: "center" }}>Filters</h3>
          <div className="filtersDiv" onChange={category}>
            <select className="priceFilter" defaultValue={-1}>
              <option value={"all"}>All Products</option>
              <option value={"Fruits"}>Fruits</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fresh Fruits">Fresh Fruits</option>
              <option value="Fresh Vegetable">Fresh Vegetable</option>
            </select>
          </div>

          {/* Price Filter */}
          <div className="filtersDiv" onChange={priceFilter}>
            <select className="priceFilter" defaultValue={-1}>
              <option value={-1} style={{ display: "none" }}>
                -Sort by Price-
              </option>
              <option value={"low-to-high"}>Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>

          {/* Clear Filter Button */}
          <div className="clrBtnDiv">
            <button className="clearBtn" onClick={clrFilter}>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Product Section */}
        <div className="prod-section">
          <div className="prod-top-div">
            Order Timing : 8:00 am To 6:00 pm
            <span
              style={{
                color: "white",
                backgroundColor: "#556d0b",
                padding: "0.2em",
                marginLeft: "2vw",
              }}
            >
              Store Open
            </span>
            <div className="offerbox">
              <span>My Offers</span>
              <span>Page like 12</span>
            </div>
          </div>
          <div className="imgDiv">
            <img
              src="http://www.way2door.com/images/stores/banner_1574312382banner-lucknow-veg-express-min.png"
              alt=""
              width={"100%"}
              height="100%"
            />
          </div>

          {/* products section */}
          <div className="products">
            {proData.map((val) => {
              return (
                // Product Card
                <div
                  className="productCard"
                  key={val.id.toString()}
                  id={val.id.toString()}
                >
                  <div className="prod-img">
                    <img
                      className="prodImg"
                      src={val.img}
                      alt=""
                      width={"100%"}
                      height="100%"
                    />
                    <div className="rating">
                      {val.rate} <StarIcon />
                    </div>
                    <div className="discountDiv">{val.discount}% OFF</div>
                  </div>
                  <div className="prod-content">
                    <span className="prod-name">{val.name}</span>
                    <div className="prod-content-div">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>
                          &#8377;
                          {(
                            val.price -
                            (val.discount * val.price) / 100
                          ).toFixed(2)}{" "}
                          <s>{val.price.toFixed(2)}</s>
                        </p>
                        <p
                          className="categoryDiv"
                          style={{
                            display: val.category !== "" ? "block" : "none",
                          }}
                        >
                          {val.category}
                        </p>
                      </div>

                      <div className="Prod-btnSet">
                        {val.cart !== 0 && (
                          <div className="counter">
                            <button
                              style={{
                                padding: "0.1vw 0.7vw",
                                marginRight: "0.3em",
                                fontSize: "1.7vw",
                                fontWeight: "800",
                              }}
                              onClick={decrement}
                            >
                              -
                            </button>
                            <span>{val.cart}</span>
                            <button
                              style={{
                                padding: "0.1vw 0.7vw",
                                marginLeft: "0.3em",
                                fontSize: "1.7vw",
                                fontWeight: "800",
                              }}
                              onClick={increment}
                            >
                              +
                            </button>
                          </div>
                        )}
                        {val.cart === 0 ? (
                          <button className={"addBtn"} onClick={addCart}>
                            Add to Cart
                          </button>
                        ) : (
                          <button className={"removeBtn"} onClick={removeCart}>
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SNACKBAR */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => {
          setSnack({ open: false, html: "", severity: "info" });
        }}
      >
        <Alert
          severity={snack.severity}
          variant="filled"
          onClose={() => {
            setSnack({ open: false, html: "", severity: "info" });
          }}
        >
          {snack.html}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Products;
