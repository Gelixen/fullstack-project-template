import MainHeader from "../components/posts/MainHeader";
import {Outlet} from "react-router-dom";

function RootLayout() {
  return (
      <>
        <MainHeader/>
        <Outlet/>
      </>
  )
}

export default RootLayout;