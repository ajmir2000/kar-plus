import "./App.css";
import "reset-css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRoutes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import routes from "./routes.jsx";

function App() {
  const router = useRoutes(routes);
  return <>
  <div className="App proBackground">
    <NavBar/>
    {router}
   
    </div>
  </>;
}

export default App;
