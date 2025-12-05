import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addToCart, removeFromCart } from "@/slices/cartSlice";
import type { Product } from "@/types/products.types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function CartScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const addToCartHandler = async (product: Product, qty: number) => {
    await dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id: string) => {
    await dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>
          <h3>Cart is empty</h3>
          <Link to="/products">Go to products</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 justify-between border-b pb-4"
            >
              <img src={item.image} alt={item.name} />
              <Link to={`/products/${item._id}`}>{item.name}</Link>
              <p>${item.price}</p>
              <div>
                <Button onClick={() => addToCartHandler(item, item.qty - 1)}>
                  -
                </Button>
                <span>{item.qty}</span>
                <Button onClick={() => addToCartHandler(item, item.qty + 1)}>
                  +
                </Button>
              </div>
              <Button onClick={() => removeFromCartHandler(item._id)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      <Card>
        <h2>
          Subtotal ({cartItems.reduce((acc, curr) => acc + curr.qty, 0)}) items
        </h2>
        ${cartItems.reduce((acc, curr) => acc + curr.qty * curr.price, 0)}
        <Button
          disabled={cartItems.length === 0}
          onClick={() => checkoutHandler()}
        >
          Proceed to checkout
        </Button>
      </Card>
    </div>
  );
}
