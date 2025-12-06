import { Link } from "react-router-dom";

export default function CheckoutSteps({
  step1,
  step2,
  step3,
  step4,
}: {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}) {
  return (
    <div className="flex justify-center items-center gap-4">
      <div>
        {step1 ? <Link to="/login">Sign In</Link> : <Link to="">Sign In</Link>}
      </div>
      <div>
        {step2 ? (
          <Link to="/shipping">Shipping</Link>
        ) : (
          <Link to="">Shipping</Link>
        )}
      </div>
      <div>
        {step3 ? (
          <Link to="/payment">Payment</Link>
        ) : (
          <Link to="">Payment</Link>
        )}
      </div>
      <div>
        {step4 ? (
          <Link to="/place-order">Place Order</Link>
        ) : (
          <Link to="">Place Order</Link>
        )}
      </div>
    </div>
  );
}
