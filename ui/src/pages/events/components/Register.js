import { Skeleton } from "antd";
import React from "react";
import { Fragment } from "react";

const Register = (props) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const FormatDate = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDay()
        let days = day;
        if (day < 10) {
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
        if (minute < 10) {
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
                <Skeleton />
                <p>{props.description}</p>
                <p><img src='https://res.cloudinary.com/patal/image/upload/v1635988813/patal/icons/Date_xjdhjf.png' alt="iconDate" />{FormatDateEvent()}</p>
                <p><img src='https://res.cloudinary.com/patal/image/upload/v1635988813/patal/icons/Time_fdpafr.png' alt="iconTime" />{FormatTimeEvent()} WIB</p>
                <p><img src='https://res.cloudinary.com/patal/image/upload/v1635988813/patal/icons/Paid_dt8ini.png' alt="iconPaid" />{props.fee}</p>
                <div className="youtube">
                    <p><img src='https://res.cloudinary.com/patal/image/upload/v1635988813/patal/icons/Youtube_mn5xxe.png' alt="iconYoutube" /></p>
                    <iframe src={props.youtube_id} title={props.title} />
                </div>
            </div>
        </Fragment>
    )
}

export default Register