import React, { useState } from "react";
import { Row, Container, Col, Button, Table } from "react-bootstrap"

import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Checkbox } from "@progress/kendo-react-inputs";
import {
  IntlProvider,
  load,
  loadMessages,
  LocalizationProvider,
} from "@progress/kendo-react-intl";

import likelySubtags from "cldr-core/supplemental/likelySubtags.json";
import currencyData from "cldr-core/supplemental/currencyData.json";
import weekData from "cldr-core/supplemental/weekData.json";
import numbers from "cldr-numbers-full/main/es/numbers.json";
import caGregorian from "cldr-dates-full/main/es/ca-gregorian.json";
import dateFields from "cldr-dates-full/main/es/dateFields.json";
import timeZoneNames from "cldr-dates-full/main/es/timeZoneNames.json";
import esMessages from "../es.json";
load(
  likelySubtags,
  currencyData,
  weekData,
  numbers,
  caGregorian,
  dateFields,
  timeZoneNames
);


loadMessages(esMessages, "es-ES");

export default function UserSymptomLog() {

  const [value, setValue] = React.useState(new Date());
  const [listData, setList] = useState([]);
  const [editFormData, setEditFormData] = useState({
    name: "",
    lastname: "",
    bornDate: "",
    temperature: "",
    symptom: []

  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editFormData.name !== "" && editFormData.lastname !== "")
      return;

    const newFormData = [...listData];
    newFormData.push(editFormData)
    setList(newFormData);
    setEditFormData({
      name: "",
      lastname: "",
      bornDate: "",
      temperature: "",
      symptom: []

    })
  }

  const handleEditFormChange = (event) => {
    const newFormData = { ...editFormData };
    if (event.preventDefault) {
      event.preventDefault();
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
      newFormData[fieldName] = fieldValue;
    }
    else {
      if (event.target.value) {
        const newFormDataSymptom = [...editFormData.symptom];
        newFormDataSymptom.push(event.target.name);
        newFormData.symptom = newFormDataSymptom;
      }
      else {
        newFormData.symptom = newFormData.symptom.filter(function (ele) {
          return ele !== event.target.name;
        })
      }
    }

    setEditFormData(newFormData);
  };

  const [locale, setLocale] = React.useState({
    language: "en-US",
    locale: "en",
  });

  const changeDate = ({ value }) => {
    setValue(value);
  };
  return (
    <LocalizationProvider language={locale.language}>
      <IntlProvider locale={locale.locale}>
        <Container>
          <div className="pb-4">
            <form onSubmit={(event) => handleSubmit(event)}>
              <Row>
                <Col md={3} >
                  <label>Nombres</label>
                  <br />
                  <input
                    type="text"
                    required
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                  ></input>
                </Col>
                <Col md={3} >
                  <label>Apellidos</label><br />
                  <input
                    type="text"
                    required
                    name="lastname"
                    value={editFormData.lastname}
                    onChange={handleEditFormChange}
                  ></input>
                </Col>
                <Col md={3} >
                  <label>Fecha de nacimiento</label>
                  <DatePicker defaultValue={value} defaultShow={true} />
                </Col>
                <Col md={3} >
                  <label>temperatura</label><br />
                  <input
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    type="text"
                    required
                    name="temperature"
                    value={editFormData.temperature}
                    onChange={handleEditFormChange}
                  ></input>
                </Col>
              </Row>
              <br />
              <Row>
                <label>Sintomas</label><br />
                <Col md={1} >
                  <Checkbox name="Fiebre" label={"Fiebre"} onChange={handleEditFormChange} />
                </Col>
                <Col md={1} >
                  <Checkbox name="Tos" label={"Tos"} onChange={handleEditFormChange} />
                </Col>
                <Col md={2} >
                  <Checkbox name="Cansancio" label={"Cansancio"} onChange={handleEditFormChange} />
                </Col>
                <Col md={3} >
                  <Checkbox name="Pérdida del gusto o del olfato" label={"Pérdida del gusto o del olfato"} onChange={handleEditFormChange} />
                </Col>
                <Col md={2} >
                  <Checkbox name="Dolor de garganta" label={"Dolor de garganta"} onChange={handleEditFormChange} />
                </Col>
                <Col md={3} >
                  <Checkbox name="Dolor de cabeza" label={"Dolor de cabeza"} onChange={handleEditFormChange} />
                </Col>
                <Col md={2} >
                  <Checkbox name="Molestias y dolores" label={"Molestias y dolores"} onChange={handleEditFormChange} />
                </Col>
                <Col md={1} >
                  <Checkbox name="Diarrea" label={"Diarrea"} onChange={handleEditFormChange} />
                </Col>
              </Row>
              <br />
              <div style={{ textAlign: 'right' }}>
                <Button size="sm" variant="primary" type="button"
                  onClick={handleSubmit}> Enviar
                </Button>
              </div>
            </form>
          </div>
          <Table striped bordered hover size="sm" className="text-center align-middle ">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha nacimiento</th>
                <th>Temperatura</th>
                <th>síntomas</th>
              </tr>
            </thead>
            <tbody >
              {
                listData.map((data, i) => (
                  <tr key={i}>
                    <td>{data.name} </td>
                    <td>{data.lastname} </td>
                    <td>{data.bornDate} </td>
                    <td>{data.temperature} </td>
                    <td>{data.symptom.map((dataSymptom, j) => (
                      <ul key={j}>
                        <li>{dataSymptom}</li>
                      </ul>
                    ))} </td>
                  </tr>
                ))
              }
            </tbody>
          </Table >
        </Container>
      </IntlProvider>
    </LocalizationProvider>
  );
}
