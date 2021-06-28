import { useState, useEffect } from "react";
import { getAvailabilityByDistrict, getAvailabilityByPin } from "../../services";
import { Spin } from "antd";
import { LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useDocumentTitle } from "../../utils";
import Sound from 'react-sound';
import bell_ring from "../../assets/bell_ring.aac";

const Found = () => {
    useDocumentTitle("Slot Found!");
    return (
        <>
            <Sound
                url={bell_ring}
                playStatus={Sound.status.PLAYING}
            />
            <div style={{ textAlign: "center" }}>
                <h2>A vacant slot has been found!</h2>
                <CheckCircleOutlined style={{ fontSize: 48, color: "green" }} />
                <p style={{ marginTop: 10 }}>Please visit the <a href="https://www.cowin.gov.in/home" target="_blank" rel="noreferrer">CoWIN website</a> to book the slot immediately.</p>
            </div>
        </>
    )
}

const Matching = () => {
    useDocumentTitle('Finding Slot');
    return (
        <div style={{ textAlign: "center" }}>
            <h2>Searching for slot availability</h2>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
    )
}

const Finding = ({ values }) => {
    const [found, setFound] = useState(false);

    useEffect(() => {
        if (values.method === "pincode") {
            getAvailabilityByPin(values.pincode)
                .then(({ available }) => {
                    if (available) {
                        setFound(true);
                    }
                })
        }
        else if (values.method === "district") {
            getAvailabilityByDistrict(values.district)
                .then(({ available }) => {
                    if (available) {
                        setFound(true);
                    }
                })
        }
    }, [values])

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            {found ? <Found /> : <Matching />}
        </div>
    )
}

export default Finding