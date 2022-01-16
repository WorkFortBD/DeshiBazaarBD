import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../master/message/ErrorMessage";
import { getUserOrderList } from "../orders/_redux/action/OrderAction";
import dayjs from "dayjs";
import Link from "next/link";
import { activeCurrency, formatCurrency } from "../../services/currency";
import LoadingSpinner from "../master/loading/LoadingSpinner";
import WarningMessage from "../master/warningMessage/WarningMessage";

const TrackingForm = ({ show, setShow }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { orderList, isLoading } = useSelector((state) => state.order);
  const userData = useSelector((state) => state.user.userData);

  const onSubmit = (data) => {
    router.push(`/order/${data.orderID}`).then((_) => window.scrollTo(0, 0));
    setShow(false);
  };

  useEffect(() => {
    const prevTransaction = localStorage.getItem("tr") || null;

    if (
      typeof prevTransaction === "undefined" ||
      prevTransaction === null ||
      prevTransaction === false
    ) {
      localStorage.removeItem("tr");
      dispatch(getUserOrderList(5));
    }
  }, []);

  return (
    <div className="p-2">
      {typeof userData !== "undefined" && userData !== null && (
        <div>
          <h6 className="order_tracking_form_title border-bottom p-2">
            {" "}
            My Last Order
          </h6>
          {isLoading && <LoadingSpinner text="Loading order list...." />}
          {!isLoading && orderList.length === 0 && (
            <WarningMessage text="Sorry! Order list not found...." />
          )}
          {!isLoading && orderList.length > 0 && (
            <>
              {orderList.map((item, index) => (
                <p key={index} className="order-tracking-item">
                  <Link href={`/order/${item.id}`}>
                    <a>
                      {dayjs(item.transaction_date).format("DD/MM/YYYY")} - #
                      {item.id} - {formatCurrency(item.final_total)}{" "}
                      {activeCurrency("code")}
                    </a>
                  </Link>
                </p>
              ))}
            </>
          )}
        </div>
      )}

      <h6 className="order_tracking_form_title mt-2"> Track My Order</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="form-control mr-1"
          name="orderID"
          autoComplete="off"
          placeholder="Enter Your Order ID No"
          ref={register({ required: true })}
        />

        {errors.orderID && (
          <ErrorMessage message="Please Enter Your Order ID No" />
        )}
        <button
          className="custom-button-component float-right mt-2"
          type="submit"
        >
          Track Now
        </button>
      </form>
    </div>
  );
};

export default TrackingForm;
