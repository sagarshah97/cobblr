// import logo from "./assets/cobblr-dark-logo.png";
import "./App.css";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:8000";
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          <Router />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
