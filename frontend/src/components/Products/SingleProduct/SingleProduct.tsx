import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types/products.types";
import { Link } from "react-router-dom";

interface SingleProductProps {
  product: Product;
}

export default function SingleProduct({ product }: SingleProductProps) {
  return (
    <Card>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} width={100} height={100} />
      </Link>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardFooter></CardFooter>
    </Card>
  );
}
