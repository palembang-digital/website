import React from "react";
import { Fragment } from "react";
import iconDate from '../../../assets/icons/UpcomingIcons/Date.png'
import iconPayments from '../../../assets/icons/UpcomingIcons/payments.png'
import iconTime from '../../../assets/icons/UpcomingIcons/Time.png'

const Register = (props) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const FormatDate = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDay()
        let days = day;
        if (day < 10){
            days = `0${days}`
        } else {
            days = day
        }
        const dateFormat = `${days} ${monthNames[month]} ${year}`;
        return dateFormat
    }

    const FormatTime = (time) => {
        const hour = time.getHours()
        const minute = time.getMinutes()
        let minutes = minute;
        if (minute < 10){
            minutes = `0${minute}`
        } else {
            minutes = minute
        }
        const timeFormat = `${hour}.${minutes}`;
        return timeFormat
    }

    const FormatDateEvent = () => {
        const date = new Date(props.scheduled_end) 
        const dateEvent = FormatDate(date)
        return dateEvent
    }

    const FormatTimeEvent = () => {
        const date = new Date(props.scheduled_end) 
        const TimeEvent = FormatTime(date)
        return TimeEvent
    }

    return (
        <Fragment>
            <div className="register">
                <p><img src={iconDate} alt="iconDate" />{FormatDateEvent()}</p>
                <p><img src={iconTime} alt="iconTime" />{FormatTimeEvent()} WIB</p>
                <p><img src={iconPayments} alt="iconPaid" />{props.fee}</p>
            </div>
        </Fragment>
    )
}

export default Register