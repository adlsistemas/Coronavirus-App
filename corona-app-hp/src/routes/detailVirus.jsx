import React, { useEffect, useState } from "react";
import Moment from 'react-moment';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import { Container, Row, Col } from "react-bootstrap";
import CardDetail from "../components/CardDetail/cardDetail"
import axios from "axios"
import {
    IntlProvider,
    load,
    LocalizationProvider,
    loadMessages,
} from "@progress/kendo-react-intl";
import likelySubtags from "cldr-core/supplemental/likelySubtags.json";
import currencyData from "cldr-core/supplemental/currencyData.json";
import weekData from "cldr-core/supplemental/weekData.json";
import numbers from "cldr-numbers-full/main/es/numbers.json";
import currencies from "cldr-numbers-full/main/es/currencies.json";
import caGregorian from "cldr-dates-full/main/es/ca-gregorian.json";
import dateFields from "cldr-dates-full/main/es/dateFields.json";
import timeZoneNames from "cldr-dates-full/main/es/timeZoneNames.json";
import esMessages from "../es.json";
import { Link } from "react-router-dom";
Moment.globalLocale = 'es';
load(
    likelySubtags,
    currencyData,
    weekData,
    numbers,
    currencies,
    caGregorian,
    dateFields,
    timeZoneNames
);
loadMessages(esMessages, "es-ES");

export default function DetailVirus() {

    const initialFilter = {
        logic: "and",
        filters: [
            {
                field: "ProductName",
                operator: "contains",
                value: "",
            },
        ],
    };

    const [filter, setFilter] = React.useState(initialFilter);
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
    const [locale, setLocale] = React.useState({
        language: "es-ES",
        locale: "es",
    });
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
                <br />
                <div>
                    <h1>Casos por Paises</h1>
                    < LocalizationProvider language={locale.language}>
                        <IntlProvider locale={locale.locale}>
                            <Grid style={{ height: "400px" }} data={filterBy(listDataCountries, filter)} filterable={true}
                                onFilterChange={(e) => setFilter(e.filter)}
                                filter={filter}>
                                <GridColumn field="Country" title="Pais" />
                                <GridColumn field="TotalConfirmed" className="text-center" format="{0:n0}" filterable={false} title="Total Confirmados" />
                                <GridColumn field="TotalDeaths" className="text-center" format="{0:n0}" filterable={false} title="Total Fallecidos" />
                                <GridColumn field="TotalRecovered" className="text-center" format="{0:n0}" filterable={false} title="Total Recuperados" />
                                <GridColumn title="" filterable={false} cell={(props) => {

                                    let field = props.dataItem || "";
                                    return (
                                        <div className="text-center">
                                            <Link style={{ textDecoration: "underline" }} to={`/DetailCountry/${field.Slug}`}>Ver Detalle</Link>
                                        </div>
                                    );
                                }} />
                            </Grid>
                        </IntlProvider>
                    </LocalizationProvider>
                </div>
            </div >
        </Container >
    );
}