import { Button } from "@/components/ui/button";
import { addToCart } from "@/slices/cartSlice";
import { useGetProductDetailsQuery } from "@/slices/productsApiSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SingleProduct() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  return (
    <div>
      <Link to="/products">Back</Link>
      {isLoading ? <div>Loading...</div> : null}
      {error ? <div>Error..</div> : null}
      {product && (
        <div>
          <div>
            <img src={product.image} alt={product?.name} />
            <div>
              <h2>{product.name}</h2>
              <p>{product.price}</p>
              <p>{product.description}</p>
              {product.countInStock && product.countInStock > 0 ? (
                <div>{product.countInStock} in stock</div>
              ) : (
                <div>Out of stock</div>
              )}

              {product.countInStock > 0 ? (
                // <Select>
                //   <SelectTrigger>
                //     <SelectValue value={`${qty}`} placeholder="Select Quantity" />
                //     <SelectContent>
                //       {Array.from(
                //         { length: product.countInStock },
                //         (_, index) => (
                //           <SelectItem key={index} value={index + 1}>
                //             {index + 1}
                //           </SelectItem>
                //         )
                //       )}
                //     </SelectContent>
                //   </SelectTrigger>
                // </Select>
                <div>
                  <Button onClick={() => setQty(qty - 1)} disabled={qty <= 1}>
                    -
                  </Button>
                  <span>{qty}</span>
                  <Button
                    onClick={() => setQty(qty + 1)}
                    disabled={qty >= product.countInStock}
                  >
                    +
                  </Button>
                </div>
              ) : null}
              <Button
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </div>
          </div>
          <div>
            <h3>Customer Reviews</h3>
          </div>
        </div>
      )}
    </div>
  );
}
