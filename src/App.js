// import logo from "./assets/cobblr-dark-logo.png";
import "./App.css";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
function App() {
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
