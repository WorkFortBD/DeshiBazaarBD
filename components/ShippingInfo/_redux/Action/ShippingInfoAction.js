import * as Types from "../Types/Types";
import Axios from "axios"
import { showToast } from "../../../master/Helper/ToastHelper";

export const getCheckoutPaymentMethods = () => (dispatch) => {
    const data = [
        {
            id: "cash",
            name: "Cash on delivery",
            methodImg: []
        },
        {
            id: "online",
            name: "Online Banking (Bkash, Nagad, Rocket and Others)",
            methodImg: [
                { img: "https://iconape.com/wp-content/files/qf/373193/png/373193.png" },
                { img: "https://seeklogo.com/images/N/nagad-logo-7A70CCFEE0-seeklogo.com.png" },
                { img: "https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png" },
                { img: "https://upload.wikimedia.org/wikipedia/commons/b/b4/SureCash_Logo.png" },
                { img: "https://www.pngkey.com/png/detail/196-1968868_major-credit-card-logos-credit-debit-card-logo.png" },
                { img: "https://seeklogo.com/images/C/city-bank-logo-7D2C072C2C-seeklogo.com.png" },
                { img: "https://skybanking.ebl-bd.com/assets/images/site_logo.png" },
            ]
        },
        // {
        //     id: "creditDebitCard",
        //     name: "Credit / Debit Card",
        //     methodImg: [
        //         { img: "https://www.pngkey.com/png/detail/196-1968868_major-credit-card-logos-credit-debit-card-logo.png" },
        //     ]
        // },
        // {
        //     id: "onlineBanking",
        //     name: "Online Banking",
        //     methodImg: [
        //         { img: "https://seeklogo.com/images/C/city-bank-logo-7D2C072C2C-seeklogo.com.png" },
        //         { img: "https://skybanking.ebl-bd.com/assets/images/site_logo.png" },
        //     ]
        // },
        // {
        //     id: "directBank",
        //     name: "Direct Bank",
        //     methodImg: []
        // },
    ]
    dispatch({type: Types.CHECKOUT_PAYMENT_METHODS, payload: data})
}