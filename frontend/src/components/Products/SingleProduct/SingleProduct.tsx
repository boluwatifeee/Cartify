import { Button } from "@/components/ui/button";
import type { Product } from "@/types/products.types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SingleProduct() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/api/products/${productId}`);
      setProduct(response.data);
    };
    fetchProduct();
  }, [productId]);

  return (
    <div>
      <Link to="/products">Back</Link>
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
