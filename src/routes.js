import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AboutUs from "./allMenus/aboutUs/aboutUs";
import Companies from "./allMenus/companies/companies";
import FindTalent from "./allMenus/findTalent/findTakent";
import SignIn from "./allMenus/signIn/signIn";
import SignUp from "./allMenus/signUp/signUp";
import FindWork from "./allMenus/findWork/findWork";

let routes = [
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/find-work", element: <FindWork /> },
  { path: "/find-talent", element: <FindTalent /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/companies", element: <Companies /> },
];
export default routes;
