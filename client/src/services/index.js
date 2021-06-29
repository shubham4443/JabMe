import axios from "axios";
import moment from "moment";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "http://13.232.77.199:3000/api/v1" : "http://localhost:5000/api/v1";

export const getStates = async () => {
    const { data } = await axios({
        url: `/locations/states`,
        method: `get`
    })
    return data;
}

export const getDistricts = async (state_id) => {
    const { data } = await axios({
        url: `/locations/districts/${state_id}`,
        method: `get`
    })
    return data;   
}

export const getAvailabilityByPin = async (pincode) => {
    const date = moment().format("DD-MM-YYYY");
    const { data } = await axios({
        url: `/availability/pin?pincode=${pincode}&date=${date}`,
        method: `get`
    })
    return data;
}

export const getAvailabilityByDistrict = async (districtCode) => {
    const date = moment().format("DD-MM-YYYY");
    const { data } = await axios({
        url: `/availability/district?district_id=${districtCode}&date=${date}`,
        method: `get`
    })
    return data;
}