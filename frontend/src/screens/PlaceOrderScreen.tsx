import CheckoutSteps from "@/components/CheckoutSteps";
import FormContainer from "@/components/FormContainer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { clearCartItems } from "@/slices/cartSlice";
import { useCreateOrderMutation } from "@/slices/ordersApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems({}));
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, cart.shippingAddress.address, cart.paymentMethod]);

  return (
    <div>
      <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
      <h1>Order Summary</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div>
            <h2>Shipping</h2>
            <p>
              <strong>Address:</strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>
          <div>Payment Method:</div>
          <div>
            <strong>Method:</strong>
            {cart.paymentMethod}
          </div>
          <div>
            <p>Order Items</p>
            {cart.cartItems.length === 0 ? (
              <div>
                <p>No order items</p>
              </div>
            ) : (
              <div>
                {cart.cartItems.map((item) => (
                  <div key={item._id}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>
                      ${item.price} x {item.qty} = ${item.price * item.qty}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
            <CardDescription>
              <div className="flex justify-between">
                <span>Items:</span> $
                {cart.cartItems.reduce(
                  (acc, curr) => acc + curr.price * curr.qty,
                  0
                )}
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span> ${cart.shippingPrice}
              </div>
              <div className="flex justify-between">
                <span>Tax:</span> ${cart.taxPrice}
              </div>
              <div className="flex justify-between">
                <span>Total:</span> ${cart.totalPrice}
              </div>
              {error && <div>{error.data.message || error.error}</div>}
              <Button
                onClick={placeOrderHandler}
                disabled={cart.cartItems.length === 0}
                type="button"
              >
                Place Order
              </Button>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
