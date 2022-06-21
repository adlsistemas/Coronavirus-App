
import { Navbar, Container, Nav } from "react-bootstrap"
import { Outlet, Link } from "react-router-dom";
import Header from "./components/Header/header";
import '@progress/kendo-theme-default/dist/all.css';

export default function App() {
  return (
    <Container>
      <Header />
      <Navbar  >
        <Container>
          <Nav className="me-auto">
            <Link to="/DetailVirus">Informacion por pais</Link> | {"  "}
            <Link to="/SymptomLog">Registro de sintomas</Link>
          </Nav>
        </Container>
      </Navbar>
      <hr />
      <Outlet />
    </Container>
  );
}