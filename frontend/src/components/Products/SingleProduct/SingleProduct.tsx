import { Button } from "@/components/ui/button";
import { useGetProductDetailsQuery } from "@/slices/productsApiSlice";
import { Link, useParams } from "react-router-dom";

export default function SingleProduct() {
  const { id: productId } = useParams();
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
              <Button>Add to Cart</Button>
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
