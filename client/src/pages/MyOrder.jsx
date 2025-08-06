import React from "react";
import { useSelector } from "react-redux";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
// import { useGlobalContext } from '../provider/GlobalProvider'

function MyOrder() {
  const orders = useSelector((state) => state.order.order);
  function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "just now";
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white shadow-md p-4 rounded mb-6">
        <h1 className="text-xl font-bold text-gray-800">My Orders</h1>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          No Orders Found
        </div>
      ) : (
        orders.map((order, index) => {
          return (
            <div
              key={order._id + index + "order"}
              className="bg-white shadow rounded-md p-4 mb-4 border border-gray-100"
            >
              <div className="mb-2 text-gray-700 font-semibold flex justify-between">
                <span>
                  Order ID:{" "}
                  <span className="text-gray-900">{order.orderId}</span>
                </span>
                <span className="text-sm text-gray-500">
                  Placed {timeAgo(order.createdAt)}
                </span>
              </div>

              <div className="flex gap-4 items-center">
                <img
                  src={order.product_details.image[0]}
                  alt={order.product_details.name}
                  className="w-16 h-16 rounded object-cover border"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {order.product_details.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment: {order.payment_status}
                  </p>
                  <p className="text-sm text-gray-500">
                    Amount: {DisplayPriceInRupees(order.totalAmt)}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MyOrder;
