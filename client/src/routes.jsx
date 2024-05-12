import LandingPage from "./pages/Landing/LandingPage.jsx";
import AboutUs from "./pages/aboutUs/aboutUs.jsx";
import Companies from "./pages/companies/companies.jsx";
import FindTalent from "./pages/findTalent/findTalent.jsx";
import SignIn from "./pages/signIn/signIn.jsx";
import SignUp from "./pages/signUp/signUp.jsx";
import FindWork from "./pages/findWork/findWork.jsx";

let routes = [
  { path: "/", element: <LandingPage /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/find-work", element: <FindWork /> },
  { path: "/find-talent", element: <FindTalent /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/companies", element: <Companies /> },
];
export default routes;
