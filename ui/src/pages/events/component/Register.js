import React from "react";
import { Fragment } from "react";
import iconDate from '../../../assets/icons/UpcomingIcons/Date.png'
// import iconFree from '../../../assets/icons/UpcomingIcons/Free.png'
import iconPayments from '../../../assets/icons/UpcomingIcons/payments.png'
// import iconLocation from '../../../assets/icons/UpcomingIcons/Location.png'
import iconTime from '../../../assets/icons/UpcomingIcons/Time.png'

const Register = () => {
    return (
        <Fragment>
            <div className="register">
                <p><img src={iconDate} alt="iconDate" /> Jum'at, 24 September 2021</p>
                <p><img src={iconTime} alt="iconTime" />19.00 WIB</p>
                <p><img src={iconPayments} alt="iconPaid" />20K</p>
                {/* <p><img src={iconLocation} alt="iconLocation" />  Live via Zoom Meet</p> */}
            </div>
        </Fragment>
    )
}

export default Register