import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/slices/productsApiSlice";

export default function Products() {
  const { data: products, isLoading, error } = useGetProductsQuery({});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products?.map((product) => (
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
