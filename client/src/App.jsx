import "./App.css";
import "reset-css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import CompanyDetails from "./pages/companyCardDetail/companyDetails.jsx";
import CreateJob from "./pages/CreateJob/CreateJob.jsx";
import MyJobs from "./pages/MyJobs/MyJobs.jsx";
import EditJob from "./pages/EditJob/EditJob.jsx";
import TalentOrder from "./pages/talentOrder/talentOrder.jsx";
import Messages from "./pages/messages/messages.jsx";
import Message from "./pages/message/message.jsx";

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
            <Route path="/companies/:id" element={<CompanyDetails />} />
            <Route path="/talent-order"  element={<TalentOrder/>}/>
            <Route path="/messages"  element={<Messages/>}/>
            <Route path="/message/:id"  element={<Message/>}/>


            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-job" element={<CreateJob />} />
              <Route path="/my-job" element={<MyJobs />} />
              <Route path="/edit-job/:id" element={<EditJob />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
