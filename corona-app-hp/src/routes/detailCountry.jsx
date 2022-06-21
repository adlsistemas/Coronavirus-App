import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import Moment from 'react-moment';
import { Container, Row, Col } from "react-bootstrap";
import {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartTitle,
} from "@progress/kendo-react-charts";
import CardDetail from "../components/CardDetail/cardDetail";

export default function DetailCountry() {

    const [listDataCountry, setListDataCountry] = useState({});

    const [ListDataCountriesFilter, setListDataCountriesFilter] = useState({});
    let params = useParams();
    const getData = async () => {
        const resp = axios.get(`https://api.covid19api.com/dayone/country/${params.idCountry}`);
        return resp;
    }

    const getDataCountry = async () => {
        const resp = axios.get("https://api.covid19api.com/summary");
        return resp;
    }
    const addDays = (fecha, amountDays) => {
        fecha.setDate(fecha.getDate() + amountDays);
        return fecha;
    }

    useEffect(() => {
        populateData();
        populateDataCountry();
    }, [])
    const populateDataCountry = () => {
        getDataCountry().then(resp => {
            setListDataCountriesFilter(resp.data.Countries.filter(data => data.Slug === params.idCountry)[0]);
        });
    }
    const populateData = () => {
        getData().then(resp => {
            let dateInitial = addDays(new Date(), -360)
            let dataServiceFilter = resp.data.filter(data => new Date(data.Date).getTime() >= new Date(dateInitial).getTime());
            let dataChart = { "Confirmados": [], "Muertes": [], "Recuperados": [] };
            dataServiceFilter.forEach(element => {
                dataChart.Confirmados.push([new Date(element.Date), element.Confirmed])
                dataChart.Muertes.push([new Date(element.Date), element.Deaths])
                dataChart.Recuperados.push([new Date(element.Date), element.Recovered])
            });
            setListDataCountry(dataChart);
        });
    }
    return (
        <Container>
            <h1>Informacion detallada de: {params.idCountry}  </h1>
            <small>Actualizado:  <Moment>{ListDataCountriesFilter.Date}</Moment></small>
            <div className="d-flex justify-content-center">

                <Row>
                    <Col md={4} >
                        <CardDetail data={{ Title: "Confirmados", Info: ListDataCountriesFilter.TotalConfirmed === 0 ? "-" : ListDataCountriesFilter.TotalConfirmed, foot: `+ ${ListDataCountriesFilter?.NewConfirmed ?? ""}`, }}></CardDetail>
                    </Col>
                    <Col md={4} >
                        <CardDetail data={{ Title: "Fallecidos", Info: ListDataCountriesFilter.TotalDeaths === 0 ? "-" : ListDataCountriesFilter.TotalDeaths, foot: `+ ${ListDataCountriesFilter?.NewDeaths ?? ""}`, }}></CardDetail>
                    </Col>
                    <Col md={4} >
                        <CardDetail data={{ Title: "Recuperados", Info: ListDataCountriesFilter.TotalRecovered === 0 ? "-" : ListDataCountriesFilter.TotalRecovered, foot: `+ ${ListDataCountriesFilter?.NewRecovered ?? ""}`, }}></CardDetail>
                    </Col>
                </Row>
            </div>
            <Chart>
                <ChartTitle text="Detalle de los casos" />
                <ChartLegend position="top" orientation="horizontal" />
                <ChartSeries>
                    <ChartSeriesItem color={"yellow"} type="scatterLine" name="Confirmados" data={listDataCountry?.Confirmados ?? []} />
                    <ChartSeriesItem color={"red"} type="scatterLine" name="Fallecidos" data={listDataCountry?.Muertes ?? []} />
                    <ChartSeriesItem type="scatterLine" name="Recuperados" data={listDataCountry?.Recuperados ?? []} />
                </ChartSeries>
            </Chart>
        </Container>
    )
}