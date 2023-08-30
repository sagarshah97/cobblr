import "./App.css";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import axios from "axios";

function App() {
  // For deployed app, use following URLs
  axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

  // For Local Host, use following URLs
  //axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL_LOCALHOST;

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
