import { useState } from "react";
import SideBar from "../../components/common/SideBar/SideBar";

import "../../styles/pages/Admin/style.css";
import { FaMoon, FaBell } from "react-icons/fa6";
import ActualData from "./components/ActualData";
import ForecastData from "./components/ForecastData";
import PeriodDetail from "./components/PeriodDetail";
import defaultAvatar from "../../assets/images/App/default_avatar.png";


const Admin = () =>{
    const [currentPart, setCurrentPart] = useState("actual-data");
    return (
        <div id="admin-section">
        <SideBar
          className="left-part"
          currentPart={currentPart}
          setCurrentPart={setCurrentPart}
        />
        <div className="right-part">
          <div className="admin-header">
            <div className="admin-h-icon">
              <FaMoon />
            </div>
            <div className="admin-h-icon">
              <FaBell />
            </div>
            <div className="admin-h-avatar">
              <img src={defaultAvatar}></img>
            </div>
            <div className="admin-h-name">
              <span>Trong</span>
            </div>
          </div>
          <div className="content-part">
            {/* {currentPart == "dashboard" && <Dashboard />} */}
            {currentPart == "actual-data" && <ActualData />}
            {currentPart == "forecast-data" && <ForecastData />}
            {currentPart == "period-detail" && <PeriodDetail />}
          </div>
        </div>
      </div>
    );
}

export default Admin;