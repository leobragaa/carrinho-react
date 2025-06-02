import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/SideBar";
import "../layout/styleLayout.css";

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
