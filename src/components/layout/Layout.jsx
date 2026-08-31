import { Encabezamiento } from "./Encabezamiento";
import { Aside } from "./Aside";
import { Pie } from "./Pie";
import { Outlet } from "react-router";

export const Layout = ({ privado }) => {
  return (
    <div className="layout">
      <Encabezamiento />
      <aside> {privado && <Aside />}</aside>
      <main className={"neumo-concave"}>
        <Outlet />
      </main>
      <Pie />
    </div>
  );
};
