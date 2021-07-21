import { useState, useEffect } from "react";
import { getAvailabilityByDistrict, getAvailabilityByPin } from "../../services";
import { Spin } from "antd";
import { LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useDocumentTitle } from "../../utils";
import Sound from 'react-sound';
import bell_ring from "../../assets/bell_ring.aac";
import axios from "axios";

const Found = ({ onGoBack }) => {
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
                <p style={{ marginTop: 10 }}>
                    Please visit the <a href="https://www.cowin.gov.in/home" target="_blank" rel="noreferrer">CoWIN website</a> to book the slot immediately.
                    <br />
                    Or <span style={{ color: "#1DA57A", cursor: "pointer" }} onClick={onGoBack}>Go Back</span> to place another trigger.
                </p>
            </div>
        </>
    )
}

const Matching = ({ onGoBack }) => {
    useDocumentTitle('Finding Slot');
    return (
        <div style={{ textAlign: "center" }}>
            <h2>Searching for slot availability</h2>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            <p style={{ marginTop: 10 }}>
                    <span style={{ color: "#1DA57A", cursor: "pointer" }} onClick={onGoBack}>Cancel and Go Back</span> to place another trigger.
                </p>
        </div>
    )
}

const Finding = ({ values, handleGoBack }) => {
    const [found, setFound] = useState(false);
    
    let filters = "";
    if (values.age) filters += `&age=${values.age}`;
    if (values.cost) filters += `&cost=${values.cost}`;
    if (values.vaccine) filters += `&vaccine=${values.vaccine}`

    const cancelTokenSource = axios.CancelToken.source();

    useEffect(() => {
        if (values.method === "pincode") {
            getAvailabilityByPin(values.pincode, filters, cancelTokenSource.token)
                .then(({ available }) => {
                    if (available) {
                        setFound(true);
                    }
                })
        }
        else if (values.method === "district") {
            getAvailabilityByDistrict(values.district, filters, cancelTokenSource.token)
                .then(({ available }) => {
                    if (available) {
                        setFound(true);
                    }
                })
        }
    }, [values, filters, cancelTokenSource])

    return (
        <div style={{ marginTop: 90, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            {found ? <Found onGoBack={() => handleGoBack()} /> : <Matching onGoBack={() => {handleGoBack();cancelTokenSource.cancel()}}/>}
        </div>
    )
}

export default Finding