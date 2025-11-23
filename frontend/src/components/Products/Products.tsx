import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "@/types/products.types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product._id}>
          <Link to={`/products/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              width={100}
              height={100}
            />
          </Link>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardFooter></CardFooter>
        </Card>
      ))}
    </div>
  );
}
