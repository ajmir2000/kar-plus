import "./App.css";
import "reset-css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import LandingPage from "./pages/Landing/LandingPage.jsx";
import AboutUs from "./pages/aboutUs/aboutUs.jsx";
import Companies from "./pages/companies/companies.jsx";
import FindTalent from "./pages/findTalent/findTalent.jsx";
import SignIn from "./pages/signIn/signIn.jsx";
import SignUp from "./pages/signUp/signUp.jsx";
import FindWork from "./pages/findWork/findWork.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import CompanyDetails from "./pages/companyCarddetails/companyDetails.jsx";

function App() {
  return (
    <>
      <div className="App proBackground">
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/find-work" element={<FindWork />} />
            <Route path="/find-talent" element={<FindTalent />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<CompanyDetails/>}/>
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
