import CheckoutSteps from "@/components/CheckoutSteps";
import FormContainer from "@/components/FormContainer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { savePaymentMethod } from "@/slices/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(paymentMethod);
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <FormContainer>
      <CheckoutSteps step1={true} step2={true} step3={true} />
      <h1>Payment</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="PayPal"
            checked={paymentMethod === "PayPal"}
            onCheckedChange={() => setPaymentMethod("PayPal")}
            className="w-4 h-4"
          />
          <Label htmlFor="PayPal">PayPal</Label>
        </div>

        <Button type="submit">Continue</Button>
      </form>
    </FormContainer>
  );
}
