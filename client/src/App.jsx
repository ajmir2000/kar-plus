import "./App.css";
import "reset-css";
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
import JobDetails from "./pages/JobDetails/JobDetails.jsx";
import Application from "./pages/Application/Application.jsx";
import MyApplications from "./pages/MyApplicaton/MyApplicaton.jsx";
import AcceptApplication from "./pages/AcceptApplication/AcceptApplication.jsx";
// talent part
import Gigs from "./pages/TalentPages/gigs/Gigs.jsx";
import AddGigs from "./pages/TalentPages/add/Add.jsx";
import Gig from "./pages/TalentPages/gig/Gig.jsx";
import MyGigs from "./pages/TalentPages/myGigs/MyGigs.jsx";
import Orders from "./pages/TalentPages/orders/Orders.jsx";
import Messages from "./pages/TalentPages/messages/Messages.jsx";
import Message from "./pages/TalentPages/message/Message.jsx";

import CreateOrder from "./pages/CreateOrder/CreateOrder.jsx";
import Featured from "./components/TalentComponents/featured/Featured.jsx";

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
            <Route path="/accept-application/:id" element={<AcceptApplication />} />
            {/* Talent Part  */}
            <Route path="/gigs" element={<Gigs />} />
            <Route path="/add-gig" element={<AddGigs />} />
            <Route path="/gig/:id" element={<Gig />} />
            <Route path="/my-gigs" element={<MyGigs />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/message/:id" element={<Message />} />

            <Route path="/create-order/:id" element={<CreateOrder />} />
        
            <Route path="/featured" element={<Featured />} />
            

            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-job" element={<CreateJob />} />
              <Route path="/my-job" element={<MyJobs />} />
              <Route path="/edit-job/:id" element={<EditJob />} />
              <Route path="/job-detail/:id" element={<JobDetails />} />
              <Route path="/apply-job/:id" element={<Application />} />
              <Route path="/my-application" element={<MyApplications />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
