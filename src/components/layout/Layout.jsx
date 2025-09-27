import { Outlet } from "react-router";
import Menu from "../menu/Menu";

function Layout() {
  return (
    <>
      <Menu />
      <Outlet></Outlet>
    </>
  );
}
export default Layout;
