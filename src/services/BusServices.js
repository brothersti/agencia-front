import axios from "axios";

export class BusServices {
    static url = 'http://127.0.0.1:8000/api'

    static getAllBus() {
        return axios
            .get("http://127.0.0.1:8000/api/buses/");
     
        // let dataUrl = `${this.url}/buses`;
        // return axios.get(dataUrl).then((response)=> response);
    }

    static getBusById(busId) {
        let dataUrl = `${this.url}/buses/${busId}`;
        return axios.get(dataUrl);
    }

    static createBus(bus) {
        let dataUrl = `${this.url}/buses`;
        return axios.post(dataUrl, bus);
    }

    static updateBus(bus, busId) {
        let dataUrl = `${this.url}/buses/${busId}`;
        return axios.put(dataUrl, bus);
    }

    static deleteBus(busId) {
        let dataUrl = `${this.url}/buses/${busId}`;
        return axios.delete(dataUrl);
    }
}