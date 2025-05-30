import { Outlet } from "react-router-dom";
import Sidebar from "../global/SideBar";
import "../global/styleSidebar.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className= "mainDashboard">
        <Outlet />
      </main>
    </div>
  );
}
