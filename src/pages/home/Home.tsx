import { Outlet } from "react-router-dom";
import Nav from "./components/nav/Nav";
import AppFooter from "./components/footer/Footer";

const Home = () => {
  return (
    <div className=" w-full">
      <Nav />
      <Outlet />
      <AppFooter />
    </div>
  );
};

export default Home;
