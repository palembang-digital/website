import React from 'react'
import { Link } from '@reach/router';

const EventRoute = (props) => {
    const FormatDate = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDay()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const dateFormat = `${hour}-${minute}-${day}-${month}-${year}`;
        return dateFormat
    }

    const TimeNow = () => {
        const date = new Date()
        return FormatDate(date)
    }

    const TImeEvent = () => {
        const date = new Date(props.scheduled_end)
        return FormatDate(date)
    }

    return (
        <Link to={`/events/${TImeEvent() > TimeNow() ? "detailupcoming" : "detaildone"}/${props.id}`}><li key={props.id}>{props.title}</li></Link>
    )
}

export default EventRoute
