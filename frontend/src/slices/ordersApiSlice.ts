import { ORDERS_URL } from "@/constants";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPaymentIntent: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/create-payment-intent`,
        method: "POST",
      }),
    }),
    updateOrderToPaid: builder.mutation({
      query: ({ orderId, paymentData }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: paymentData,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useCreatePaymentIntentMutation,
  useUpdateOrderToPaidMutation,
} = ordersApiSlice;
