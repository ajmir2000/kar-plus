import "reset-css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {  useRoutes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import routes from "./routes";

function App() {
  let router=useRoutes(routes)
  return (
   
    <div className="App proBackground">
    <NavBar/>
    {router}
    </div>
  );
}

export default App;
