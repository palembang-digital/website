import React from "react";
import ImageTes2 from '../../assets/img/image-tes2.png'
import Register from "./component/Register";
import './EventsDetail.scss'

const EventsDetailDone = () => {
    return (
        <div className="DetailEvent">
            <div className="container">
                <div className="title">
                    <h1>Workshop Session 1.0</h1>
                    <h3>Menghadapi technical Interview di Startup Teknologi</h3>
                </div>
                <div className="content">
                    <div className="img-thumb">
                        <img src={ImageTes2} alt="ImageTes2" /> <br />
                    </div>
                    <Register />
                    <div className="text" style={{ marginTop: 59 }}>
                        <p>Buat kalian yang saat ini ingin cari tau bagaimana sih sebenarny peluang karir dibidang digital seperti programming, digital marketing dan lain sebagainya dan juga kalian ingin tau bagaimana sih budaya kerja di perusahaan teknologi / digital..
                            <br /> <br />

                            Ikuti webinar Palembang digital sharing session dengan tema " Melihat peluang karir talenta digital diera sekarang"<br /> <br />

                            Dengan Narasumber Riski Jaka Lalana, beliau merupakan GM human Capital di 3(Tri) Indonesia dan juga beliau meruapakan co. founder dari Komunitas dimeja kantor.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventsDetailDone