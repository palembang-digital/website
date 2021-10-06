import React from "react";
import { Col, Row, Button } from 'antd'
import ImageTes from '../../assets/img/image-tes.png'
import iconDate from '../../assets/icons/UpcomingIcons/Date.png'
import iconFree from '../../assets/icons/UpcomingIcons/Free.png'
import iconLocation from '../../assets/icons/UpcomingIcons/Location.png'
import iconTime from '../../assets/icons/UpcomingIcons/Time.png'

import './EventsDetail.scss'

const EventsDetailUpcoming = () => {
    return (
        <div className="DetailEvent">
            <div className="container">
                <div className="title">
                    <h1>Sharing Session</h1>
                    <h3>Melihat Peluang Karir Talenta Digital di Era Sekarang</h3>
                </div>
                <div className="content">
                    <Row>
                        <Col span={11}>
                            <img src={ImageTes} alt="ImageTes" /> <br />
                        </Col>
                        <Col span={12}>
                            <div className="text">
                                <p>Buat kalian yang saat ini ingin cari tau bagaimana sih sebenarny peluang karir dibidang digital seperti programming, digital marketing dan lain sebagainya dan juga kalian ingin tau bagaimana sih budaya kerja di perusahaan teknologi / digital..
                                    <br /> <br />

                                    Ikuti webinar Palembang digital sharing session dengan tema " Melihat peluang karir talenta digital diera sekarang"<br /> <br />

                                    Dengan Narasumber Riski Jaka Lalana, beliau merupakan GM human Capital di 3(Tri) Indonesia dan juga beliau meruapakan co. founder dari Komunitas dimeja kantor.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="register">
                    <p><img src={iconDate} alt="iconDate" /> Jum'at, 24 September 2021</p>
                    <p><img src={iconTime} alt="iconTime" />19.00 WIB</p>
                    <p><img src={iconFree} alt="iconFree" />Free</p>
                    <p><img src={iconLocation} alt="iconLocation" />  Live via Zoom Meet</p>
                    <Button type="primary" shape="round">Daftar Sekarang</Button>
                </div>
            </div>
        </div>
    )
}

export default EventsDetailUpcoming;