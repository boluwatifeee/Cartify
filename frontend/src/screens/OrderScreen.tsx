import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  useGetOrderDetailsQuery,
  useCreatePaymentIntentMutation,
  useUpdateOrderToPaidMutation,
} from "@/slices/ordersApiSlice";
import { useParams } from "react-router-dom";
import StripePaymentForm from "@/components/StripePaymentForm";
import FormContainer from "@/components/FormContainer";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);

export default function OrderScreen() {
  const { id: orderId } = useParams();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [createPaymentIntent, { isLoading: isLoadingIntent }] =
    useCreatePaymentIntentMutation();
  const [updateOrderToPaid] = useUpdateOrderToPaidMutation();

  useEffect(() => {
    const createPaymentIntentHandler = async () => {
      if (!orderId) return;
      try {
        const { clientSecret: secret } = await createPaymentIntent(
          orderId
        ).unwrap();
        setClientSecret(secret);
      } catch (err: unknown) {
        const error = err as { data?: { message?: string } };
        toast.error(error?.data?.message || "Failed to initialize payment");
      }
    };

    if (
      order &&
      !order.isPaid &&
      order.paymentMethod === "Stripe" &&
      !clientSecret &&
      !isLoadingIntent
    ) {
      createPaymentIntentHandler();
    }
  }, [order, clientSecret, orderId, createPaymentIntent, isLoadingIntent]);

  const handlePaymentSuccess = async (paymentIntentId?: string) => {
    if (!orderId) return;
    try {
      await updateOrderToPaid({
        orderId,
        paymentData: {
          paymentIntentId: paymentIntentId || "stripe_payment_intent",
          status: "succeeded",
          email_address: order?.user?.email,
        },
      }).unwrap();
      refetch();
      setClientSecret(null);
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to update order");
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Error..</div>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div>
        <h2>Shipping</h2>
        <p>
          <strong>Name:</strong> {order.user.name}
        </p>
        <p>
          <strong>Email:</strong> {order.user.email}
        </p>
        <p>
          <strong>Address:</strong> {order.shippingAddress.address}
        </p>
        <p>
          <strong>City:</strong> {order.shippingAddress.city}
        </p>
        <p>
          <strong>Postal Code:</strong> {order.shippingAddress.postalCode}
        </p>
        <p>
          <strong>Country:</strong> {order.shippingAddress.country}
        </p>
      </div>
      <p>{order.isDelivered ? "Delivered" : "Not Delivered"}</p>
      <p>Payment Method: {order.paymentMethod}</p>

      <p>Status: {order.isPaid ? "Paid" : "Not Paid"}</p>
      {order.paidAt && (
        <p>Paid At: {new Date(order.paidAt).toLocaleString()}</p>
      )}

      {!order.isPaid && order.paymentMethod === "Stripe" && (
        <FormContainer className="mt-4">
          <h2>Complete Payment</h2>
          {isLoadingIntent ? (
            <div>Loading payment form...</div>
          ) : clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                },
              }}
            >
              <StripePaymentForm
                orderId={orderId!}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </Elements>
          ) : (
            <div>Failed to load payment form</div>
          )}
        </FormContainer>
      )}

      <div>
        <h2>Order Items</h2>
        <div>
          {order.orderItems.map(
            (item: {
              _id: string;
              image: string;
              name: string;
              qty: number;
              price: number;
            }) => (
              <div key={item._id}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>
                  {item.qty} x ${item.price} = ${item.qty * item.price}
                </p>
              </div>
            )
          )}
        </div>
      </div>
      <div>
        <h2>Order Summary</h2>
        <p>
          Items:{" "}
          {order.orderItems.reduce(
            (acc: number, curr: { qty: number }) => acc + curr.qty,
            0
          )}
        </p>
        <p>Items Price: ${order.itemsPrice}</p>
        <p>Shipping: ${order.shippingPrice}</p>
        <p>Tax: ${order.taxPrice}</p>
        <p>
          <strong>Total: ${order.totalPrice}</strong>
        </p>
      </div>
    </div>
  );
}
