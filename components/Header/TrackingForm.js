import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from "react-hook-form";
import ErrorMessage from '../master/ErrorMessage/ErrorMessage';

const TrackingForm = ({ show, setShow }) => {
    const router = useRouter();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => {
        router.push(`/order/${data.orderID}`)
        setShow(false);
    };

    return (
        <div className="mt-4 p-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="form-control mr-1"
                    name="orderID"
                    autoComplete="off"
                    placeholder="Enter your order ID..."
                    ref={register({ required: true })} />

                {errors.orderID && <ErrorMessage errorText="Please enter your order ID..." />}
                <button className="custom-button-component float-right mt-2" type="submit">
                    Track Now
                </button>
            </form>
        </div>
    );
};

export default TrackingForm;