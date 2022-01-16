import React, { useEffect, useState } from 'react';
import { Timeline } from "react-beautiful-horizontal-timeline";
import { useDispatch, useSelector } from 'react-redux';
import { getTrackingTimelineDate } from './_redux/action/OrderAction';

const OrderTracking = () => {

    const dispatch = useDispatch();
    const { trackingTimelineList, isLoading } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getTrackingTimelineDate())
    }, [])

    const [labelWidth, setlabelWidth]                     = useState(160);
    const [amountMove, setamountMove]                     = useState(350);
    const [lineColor, setlineColor]                       = useState("#61dafb");
    const [darkMode, setdarkMode]                         = useState(false);
    const [eventTextAlignCenter, seteventTextAlignCenter] = useState(true);
    const [showSlider, setshowSlider]                     = useState(true);
    const [arrowsSize, setarrowsSize]                     = useState(false);

    return (
        <>
            {
                !isLoading && (
                    <Timeline
                        myList               = {trackingTimelineList}
                        labelWidth           = {labelWidth}
                        amountMove           = {amountMove}
                        lineColor            = {lineColor}
                        darkMode             = {darkMode}
                        eventTextAlignCenter = {eventTextAlignCenter}
                        showSlider           = {showSlider}
                        arrowsSize           = {arrowsSize}
                    />
                )
            }
            {
                isLoading && (
                    <p className="text-center mt-3">Loading Tracking....</p>
                )
            }
        </>
    );
};

export default OrderTracking;