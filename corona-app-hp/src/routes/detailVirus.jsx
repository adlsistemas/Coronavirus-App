import React, { useEffect, useState } from "react";
import Moment from 'react-moment';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Container, Row, Col } from "react-bootstrap";
import CardDetail from "../components/CardDetail/cardDetail"
import axios from "axios"
Moment.globalLocale = 'es';
export default function DetailVirus() {


    const [listDataGlobal, setListDataGlobal] = useState({ "NewConfirmed": "" });
    const [listDataCountries, setListDataCountries] = useState([]);
    const getData = async () => {
        const resp = axios.get("https://api.covid19api.com/summary");
        return resp;
    }
    useEffect(() => {
        populateData();

    }, [])

    const populateData = () => {
        getData().then(resp => {
            setListDataCountries(resp.data.Countries);
            setListDataGlobal(resp.data.Global)
        });
    }

    return (
        <Container>
            <div>
                <h1>Casos Globales</h1>
                <small>Actualizado:  <Moment>{listDataGlobal.Date}</Moment></small>
                <div className="d-flex justify-content-center">
                    <Row>
                        <Col md={4} >
                            <CardDetail data={{ Title: "Confirmados", Info: listDataGlobal.TotalConfirmed === 0 ? "-" : listDataGlobal.TotalConfirmed, foot: `+ ${listDataGlobal?.NewConfirmed ?? ""}`, }}></CardDetail>
                        </Col>
                        <Col md={4} >
                            <CardDetail data={{ Title: "Fallecidos", Info: listDataGlobal.TotalDeaths === 0 ? "-" : listDataGlobal.TotalDeaths, foot: `+ ${listDataGlobal?.NewDeaths ?? ""}`, }}></CardDetail>
                        </Col>
                        <Col md={4} >
                            <CardDetail data={{ Title: "Recuperados", Info: listDataGlobal.TotalRecovered === 0 ? "-" : listDataGlobal.TotalRecovered, foot: `+ ${listDataGlobal?.NewRecovered ?? ""}`, }}></CardDetail>
                        </Col>
                    </Row>
                </div>
                {/* <Grid style={{ height: "400px" }} data={
                    [
                        { "Country": "", "TotalConfirmed": "", "TotalDeaths": "", "TotalRecovered": "" },
                        { "Country": "", "TotalConfirmed": "", "TotalDeaths": "", "TotalRecovered": "" },
                        { "Country": "", "TotalConfirmed": "", "TotalDeaths": "", "TotalRecovered": "" },
                        { "Country": "", "TotalConfirmed": "", "TotalDeaths": "", "TotalRecovered": "" },
                        { "Country": "", "TotalConfirmed": "", "TotalDeaths": "", "TotalRecovered": "" },
                        { "Country": "", "TotalConfirmed": "", "TotalDeaths": "", "TotalRecovered": "" },
                        { "Country": "", "TotalConfirmed": "", "TotalDeaths": "", "TotalRecovered": "" },
                    ]
                }>
                    <GridColumn field="Country" title="ID"   />
                    <GridColumn field="TotalConfirmed" title="Name"  />
                    <GridColumn field="TotalDeaths" title="CategoryName" />
                    <GridColumn field="TotalRecovered" title="Price" /> 
                </Grid> */}
            </div>
        </Container>
    );
}