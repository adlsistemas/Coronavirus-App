import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios"

export default function DetailCountry() {

    const [listDataCountry, setListDataCountry] = useState([]);
    let params = useParams();
    const getData = async () => {
        const resp = axios.get(`https://api.covid19api.com/dayone/country/${params.idCountry}`);
        return resp;
    }
    useEffect(() => {
        populateData();
    }, [])
    const populateData = () => {
        getData().then(resp => {  
            setListDataCountry(resp.data);
        });
    }
    return (
        <Container>
            <h1>INformacion detallada de: {params.idCountry}  </h1>
            {listDataCountry.map((data, j) => (
                <ul key={j}>
                    <li>{data.Confirmed}</li>
                </ul>
            ))};
        </Container>
    )
}