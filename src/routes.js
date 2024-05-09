import LandingPage from "./pages/LandingPage/LandingPage";
import AboutUs from "./pages/aboutUs/aboutUs";
import Companies from "./pages/companies/companies";
import FindTalent from "./pages/findTalent/findTakent";
import SignIn from "./pages/signIn/signIn";
import SignUp from "./pages/signUp/signUp";
import FindWork from "./pages/findWork/findWork";

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
