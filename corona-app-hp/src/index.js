import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import DetailVirus from "./routes/detailVirus";
import UserSymptomLog from "./routes/userSymptomLog"; 
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <Container>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}  >
          <Route path="/SymptomLog" element={<UserSymptomLog />} />
          <Route path="/DetailVirus" element={<DetailVirus />} />
        </Route>
        <Route path="*" element={<App />}
        />
      </Routes>
    </BrowserRouter></Container>
);