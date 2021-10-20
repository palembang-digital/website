import useRequest from "@ahooksjs/use-request";
import { useParams } from "@reach/router";
import React from "react";
import { Col, Row } from 'antd'

import Register from "./component/Register";
import './EventDetails.scss'

const EventDetailsDone = () => {
    const { id } = useParams();

    const { data: event } = useRequest(`/api/v1/events/${id}`)

    if (event == null) {
        return 'loading...'
    }

    return (
        <div className="DetailEvent">
            <div className="container">
                <div className="title">
                    <h1>{event.title}</h1>
                    {/* <h3>Menghadapi technical Interview di Startup Teknologi</h3> */}
                </div>
                <div className="content">
                    <Row>
                        <Col md={11}>
                            {/* <div className="img-thumb"> */}
                                <img src={event.image_url} alt={event.title} /> <br />
                            {/* </div> */}
                        </Col>
                        <Col md={12}>
                    <Register fee={event.registration_fee} scheduled_end={event.scheduled_end} />
                        </Col>
                    </Row>

                    <div className="text" style={{ marginTop: 59 }}>
                        {/* <p>Buat kalian yang saat ini ingin cari tau bagaimana sih sebenarny peluang karir dibidang digital seperti programming, digital marketing dan lain sebagainya dan juga kalian ingin tau bagaimana sih budaya kerja di perusahaan teknologi / digital..
                            <br /> <br />

                            Ikuti webinar Palembang digital sharing session dengan tema " Melihat peluang karir talenta digital diera sekarang"<br /> <br />

                            Dengan Narasumber Riski Jaka Lalana, beliau merupakan GM human Capital di 3(Tri) Indonesia dan juga beliau meruapakan co. founder dari Komunitas dimeja kantor.</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetailsDone