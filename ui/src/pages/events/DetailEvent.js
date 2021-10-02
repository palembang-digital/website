import React from "react";
import { Col, Row, Card } from 'antd'

const DetailEvent = () => {
    return (
        <div className="DetailEvent">
            <div className="container">
                <p>Event Detail</p>
                <Row>
                    <Col span={16}>
                        <img src="https://gotripslk.com/site/images/uploads/img.jpg" alt="TestImage" width={700} /> <br />
                        <h2><b>Seminar Nasional</b></h2> <br />
                        <h2><b>Deskripsi</b></h2>
                        <p style={{paddingRight: 70}}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy. Fusce aliquet pede non pede. Suspendisse dapibus lorem pellentesque magna. Integer nulla. Donec blandit feugiat ligula. Donec hendrerit, felis et imperdiet euismod, purus ipsum pretium metus, in lacinia nulla nisl eget sapien.</p>
                    </Col>
                    <Col span={8}>
                        <Card title="Time" bordered={false}>
                            <ul>
                                <li>12 September 2021</li>
                                <li>Zoom</li>
                                <li>Free</li>
                            </ul>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default DetailEvent;