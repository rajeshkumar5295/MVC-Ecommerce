import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  console.log(cart);

  // total price

  ///  This is not giving the total , do it later , timeStamp: 9:11:29
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };
  // second method
  const totalPric = cart.reduce((acc, curr) => acc + parseInt(curr.price), 0);
  // const totalQty=cart.reduce((acc,curr)=>acc + parseInt(curr.qty) ,0)

  //delete item
  const removeCartItem = (pid) => {
    try {
      const myCart = [...cart];
      const index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //  payment getway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // console.log(clientToken);
  // handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      //  console.log(data);
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");

      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"Your Products"}>
      <div className="container  cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light  p-2 mt-2 ">
              {" "}
              {`Hello ${auth?.token && auth?.user?.name}`}{" "}
            </h1>

            <h4 className="text-center fs-1 mt-3">
              {" "}
              {cart?.length >= 1
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }  `
                : "Your Cart is Empty"}{" "}
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row  " key={p._id}>
                <div className="col-md-4 mb-2   ">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top img-fluid  img-thumbnail   "
                    style={{ width: "auto", height: "230px" }}
                    alt={p.name}
                  />
                </div>

                <div className="col-md-8">
                  <p> Name:{p.name} </p>
                  <p> Description:{p.description.substring(0, 30)} </p>
                  <p> Price:{p.price} </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    {" "}
                    Remove{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* payment Gateway staart here */}
          <div className="col-md-4 text-center ">
            <h2> Cart Summary </h2>
            <p> Total | Checkout | Payment </p>
            <hr />
            <h4> Total: {totalPric} </h4>

            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4> Current Address </h4>
                  <h5> {auth?.user?.address} </h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    {" "}
                    Update Address{" "}
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    {" "}
                    Update Address{" "}
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login", { state: "/card" })}
                  >
                    {" "}
                    Please Login to checkout{" "}
                  </button>
                )}
              </div>
            )}

            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "checkout",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    disabled={loading || !instance || !auth?.user?.address}
                    onClick={handlePayment}
                  >
                    {" "}
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
