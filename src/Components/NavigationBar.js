import React, { useContext, useState } from "react";
import "./NavigationBar.css";
import LoginIcon from "@mui/icons-material/Login";
import SendIcon from "@mui/icons-material/Send";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  Alert,
  Badge,
  Box,
  Button,
  Drawer,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import Products from "./Products";
import { Context } from "../App";
import Footer from "./Footer";
import userData from "../User.json";
import proData from "../Products.json";

const NavigationBar = () => {
  const prod = useContext(Context);

  let [cartDrawer, setCartDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  let [snack, setSnack] = useState({
    open: false,
    html: "",
    severity: "info",
  });

  // Create account Form States
  let [uName, setUname] = useState("");
  let [email, setEmail] = useState("");
  let [contact, setContact] = useState("");
  let [pass, setPass] = useState("");

  // Function to create account
  const createAccount = () => {
    if (uName === "" || email === "" || contact === "" || pass === "") {
      setSnack({
        open: true,
        html: "Please fill all the fields",
        severity: "error",
      });
    } else {
      userData.map((val) => {
        if (email !== val.email) {
          let obj = {
            name: uName,
            email: email,
            contact: Number(contact),
            password: pass,
          };
          userData.push(obj);
          setSnack({
            open: true,
            html: "Your Account has been created successfully. Please Login to continue..",
            severity: "success",
          });

          setUname("");
          setEmail("");
          setContact("");
          setPass("");
          setOpen1(false);
          setOpen(true);
        } else {
          setSnack({
            open: true,
            html: "This e-mail already exist.",
            severity: "info",
          });
        }
      });

      console.log(userData);
    }
  };

  //function for submit of LOGIN forms
  const submitLogin = () => {
    let mail = document.getElementById("email").value;
    let pswd = document.getElementById("password").value;
    userData.map((val) => {
      if (mail === val.email && pswd === val.password) {
        setOpen(false);
        prod.setLogin(true);
        prod.setLogger(val);
        setSnack({
          open: true,
          html: "Sucessfully Logged In",
          severity: "success",
        });
      } else if (mail === "" && pswd === "") {
        setSnack({
          open: true,
          html: "Please Enter your email and password",
          severity: "error",
        });
        prod.setLogin(false);
      } else {
        setSnack({
          open: true,
          html: "Wrong Credentials, Please enter again!",
          severity: "error",
        });
        prod.setLogin(false);
      }
    });
  };

  //Function for LogOut
  const logout = () => {
    prod.setLogin(false);
    setSnack({
      open: true,
      html: "Logged Out!",
      severity: "info",
    });
    prod.setLogin(false);
  };

  // <-------Function to increase the quantity of the product------->
  const increment = (e) => {
    let click = e.target.closest(".cartCard").id;
    prod.cart.forEach((item) => {
      if (item.id == click) {
        item.cart += 1;
        prod.setCartQuan(++prod.cartQuan);
      }
    });
  };

  // <-------Function to decrease the quantity of the product------->
  const decrement = (e) => {
    let click = e.target.closest(".cartCard").id;
    prod.cart.forEach((item) => {
      if (item.id == click) {
        if (item.cart !== 1) {
          item.cart -= 1;
          prod.setCartQuan(--prod.cartQuan);
        } else return;
      }
    });
  };

  // <-------Function to remove product from the cart------->
  const removeFromCart = (e) => {
    let click = e.target.closest(".cartCard").id;
    let i;
    proData.find((item) => {
      console.log(item);
      if (item.id == click) item.cart = 0;
      prod.cart.find((val, inx) => {
        if (val.id == click) i = inx;
      });
      return item.id === +click;
    }).cart = 0;
    if (window.confirm("Dou you want to remove the product from cart?")) {
      prod.cart.splice(i, 1);
      prod.setCartQuan(--prod.cartQuan);
      setSnack({
        open: true,
        html: "Product removed from cart",
        severity: "error",
      });
    } else return;
  };

  // <-------Function to empty the cart------->
  const emptyCart = () => {
    if (window.confirm("Are you sure you want to empty the cart?")) {
      proData.forEach((val) => {
        val.cart = 0;
      });
      prod.setCart([]);
      prod.setCartQuan(0);
    } else {
      return;
    }
  };
  return (
    <>
      <div className="navigContainer">
        <div className="navig">
          <p className="animate__heartBeat">
            Downlaod WAY@DOOR APP{" "}
            <a
              style={{
                textDecoration: "none",
                color: "orangered",
                fontWeight: "600",
              }}
              href="https://play.google.com/store/apps/details?id=io.ionic.way2doorapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              click here
            </a>
          </p>

          <div className="navig-content">
            <span
              className="login-signUp"
              style={{ display: prod.login ? "none" : "flex" }}
            >
              <span
                style={{
                  display: "flex",
                  alignitems: "baseline",
                  cursor: "pointer",
                }}
                onClick={() => setOpen(true)}
              >
                <LoginIcon /> Login
              </span>
              <span
                style={{
                  display: "flex",
                  alignitems: "baseline",
                  cursor: "pointer",
                }}
                onClick={() => setOpen1(true)}
              >
                <SendIcon /> Signup
              </span>
            </span>

            <span style={{ display: "flex", alignItems: "center" }}>
              {prod.login ? <>{prod.logger.name}</> : ""}
              &emsp;
              <LogoutIcon
                sx={{ display: prod.login ? "block" : "none" }}
                onClick={logout}
              />
            </span>
          </div>
        </div>
        <div className="navig-second">
          <img
            src="http://www.way2door.com/images/way2door-min.png"
            alt="logo"
            width={"150vw"}
          />
          <p>
            Today's order will be delivered tomorrow. सबसे सस्ता और सबसे अच्छा.
          </p>

          <span>
            <Badge badgeContent={prod.cart.length} color="primary">
              <AddShoppingCartIcon
                sx={{ color: "#556d0b" }}
                onClick={() => setCartDrawer(true)}
              />
            </Badge>
          </span>
        </div>
        <div className="navig-third">Fruits and Vegetables Store</div>
      </div>

      {/* <---------PRODUCT SECTION AND FOOTER SECTION----------> */}
      <Products />
      <Footer />

      {/* USER LOGIN MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Log In
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              type={"email"}
              placeholder="E-mail"
              className="signUpform"
              id="email"
              autoFocus
              autoComplete="yes"
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              type={"password"}
              placeholder="Password"
              className="signUpform"
              id="password"
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button variant="contained" id="submitLogin" onClick={submitLogin}>
              Log In
            </Button>
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: "2vh",
              color: "#5d5d5d",
              fontSize: "small",
            }}
          >
            <em>**Sample User Id: user451@gmail.com**</em>
            <em>**Sample Password: 125451**</em>
          </Typography>
        </Box>
      </Modal>

      {/* USER SignUp MODAL */}
      <Modal open={open1} onClose={() => setOpen1(false)}>
        <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sign Up Form
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              type={"text"}
              placeholder="Name"
              className="signUpform"
              id="name"
              value={uName}
              onChange={(e) => setUname(e.target.value)}
              autoFocus
              autoComplete="yes"
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              type={"email"}
              placeholder="E-mail"
              className="signUpform"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              autoComplete="yes"
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              type={"number"}
              placeholder="Contact Number"
              className="signUpform"
              id="contact"
              maxLength={10}
              minLength={10}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              autoFocus
              autoComplete="yes"
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              type={"password"}
              placeholder="Password"
              className="signUpform"
              id="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              id="submitLogin"
              onClick={createAccount}
            >
              Sign Up
            </Button>
          </Typography>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: "2vh",
              color: "#5d5d5d",
              fontSize: "small",
              fontStyle: "oblique",
            }}
          >
            Note: Fully functional Sign Up Page
          </Typography>
        </Box>
      </Modal>

      {/* <-------SnackBar---------> */}

      <Snackbar
        open={snack.open}
        onClose={() =>
          setSnack({
            open: false,
            html: "",
            severity: "info",
          })
        }
        autoHideDuration={3000}
      >
        <Alert
          variant="filled"
          severity={snack.severity}
          onClose={() =>
            setSnack({
              open: false,
              html: "",
              severity: "info",
            })
          }
        >
          {snack.html}
        </Alert>
      </Snackbar>

      <div>
        <Drawer
          anchor={"left"}
          open={cartDrawer}
          onClose={() => setCartDrawer(false)}
          PaperProps={{ sx: { width: "80%", height: "100%" } }}
        >
          <div className="top-cart-container">
            <div className="topDiv-cart">
              <h1>Items in Your Cart</h1>
              <button className="emptyCartBtn" onClick={emptyCart}>
                Empty Cart
              </button>
            </div>
            <div className="cartCon">
              <div
                className="cartDiv"
                style={{ width: prod.cartQuan < 1 ? "100%" : "75%" }}
              >
                {prod.cart.length < 1 ? (
                  <>
                    <div className="errorCartPage"></div>
                  </>
                ) : (
                  prod.cart.map((item) => {
                    return (
                      <div
                        className="cartCard"
                        key={item.id.toString()}
                        id={item.id}
                      >
                        <div style={{ width: "35%" }}>
                          <img
                            className="cartCardImg"
                            src={item.img}
                            alt=""
                            width="80%"
                            height="125vh"
                          />
                        </div>

                        <div className="cartCardContent">
                          <span className="cartCardHead">
                            <h3>{item.name}</h3>

                            <span>
                              <h2>
                                Rs. {(item.totalPrice * item.cart).toFixed(2)}
                              </h2>
                              <s>
                                <h4>
                                  Rs. {(item.price * item.cart).toFixed(2)}
                                </h4>
                              </s>
                            </span>
                          </span>
                          <h3>Discount: {item.discount}%</h3>

                          <br />
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <button className="decreBtn" onClick={decrement}>
                                -
                              </button>
                              <span>{item.cart}</span>
                              <button className="increBtn" onClick={increment}>
                                +
                              </button>
                            </div>
                            <div>
                              <button
                                className="removeItem"
                                onClick={removeFromCart}
                              >
                                REMOVE ITEM
                              </button>
                            </div>
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div
                className="billDiv"
                style={{ display: prod.cart.length < 1 ? "none" : "block" }}
              >
                <h2>
                  PRICE DETAILS ({prod.cart.length}{" "}
                  {prod.cart.length < 2 ? "item" : "items"}):
                </h2>

                <div style={{ borderBottom: "1px solid", textAlign: "center" }}>
                  <p>
                    <b>Amount before tax: </b> Rs.{" "}
                    {prod.cart
                      .reduce((total, item) => {
                        return +(item.discountedPrice * item.cart) + total;
                      }, 0)
                      .toFixed(2)}
                  </p>
                  <p>
                    <b>Total amount incl. tax:</b> Rs.{" "}
                    {prod.cart
                      .reduce((total, item) => {
                        return +(item.discountedPrice * item.cart) + total + 5;
                      }, 0)
                      .toFixed(2)}
                  </p>

                  <p>
                    <b>Shipping charge:</b> Rs.{" "}
                    {prod.cart.length === 0 ? "00.00" : "15.00"}
                  </p>
                </div>
                <h3>
                  <b>Amount Payable:</b> Rs.{" "}
                  {prod.cart
                    .reduce((total, item) => {
                      return (
                        +(item.discountedPrice * item.cart) + total + 5 + 10
                      );
                    }, 0)
                    .toFixed(2)}
                </h3>

                <button className="checkoutBtn">
                  Proceed to pay <ArrowRightAltIcon />
                </button>
              </div>
            </div>
          </div>

          {/* SNACKBAR */}
          <Snackbar
            open={snack.open}
            autoHideDuration={1000}
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
        </Drawer>
      </div>
    </>
  );
};

export default NavigationBar;

// Style for Login In Modal
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  backgroundColor: "white",
  color: "black",
  textAlign: "center",
  border: "none",
};
