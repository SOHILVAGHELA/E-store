import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //delet item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center bg-light p-2">
                {`HEllo ${auth?.token && auth?.user?.name}`}
              </h1>
              <h4 className="text-center">
                {cart?.length
                  ? `You have ${cart.length} items in your  cart ${
                      auth?.token ? " " : "Please login to checkout"
                    }`
                  : "Your cart is empty"}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {cart?.map((p) => (
                <div className="row p-2 mb-2 card flex-row">
                  <div className="col cart-image-col">
                    <img
                      src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top cart-card-img"
                      alt={p.name}
                    />
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col">
                        <h4>{p.name}</h4>
                        <p>{p.description.substring(0, 30)}</p>
                        <h4>Price:${p.price}</h4>
                      </div>
                      <div className="col flex-grow-0">
                        <button
                          className="btn btn-danger"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-6 text-center">
              <h2>Cart Summery</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total:{totalPrice()}</h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
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
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default CartPage;
