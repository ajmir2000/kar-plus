import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AboutUs from "./allMenus/aboutUs/aboutUs";
import Companies from "./allMenus/companies/companies";
import FindTakent from "./allMenus/findTalent/findTakent";
import SignIn from "./allMenus/signIn/signIn";
import SignUp from "./allMenus/signUp/signUp";
import FindWork from "./allMenus/findWork/findWork";

let allRoutes=[

    { path:"/", element:<LandingPage /> },
    { path:"/login", element:<LoginPage /> },
    { path:"/aboutUs", element:<AboutUs /> },
    {path:"/findWork", element:<FindWork/>},
    { path:"/findTalent", element:<FindTakent /> },
    { path:"/signIn", element:<SignIn /> },
    { path:"/signUp", element:<SignUp /> },
    { path:"/companies", element:<Companies /> }

]
export default allRoutes