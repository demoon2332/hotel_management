import "../../../styles/components/common/SideBar/style.css"
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import {
  FaHouse,
  FaCircleArrowRight,
  FaCircleArrowLeft,
} from "react-icons/fa6";
import { VscGraphLine } from "react-icons/vsc";
import { MdOutlineAutoGraph } from "react-icons/md";
import { SlGraph } from "react-icons/sl";




import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";


interface SideBarProps {
    currentPart: string;
    setCurrentPart: React.Dispatch<React.SetStateAction<string>>;
    className: string;
  }


const SideBar:React.FC<SideBarProps> = ({className,currentPart, setCurrentPart}) =>{
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const navigate = useNavigate();
    
    const toggleSidebar = () => {
        sideBarOpen ? setSideBarOpen(false) : setSideBarOpen(true);
      };
    
      const backHome = () =>{
        navigate("/");
      }

    return (
        <div className={className}>
        <div className="sidebar-container">
        <ProSidebar className="sidebar" collapsed={sideBarOpen}>
          <div>
            <div style={{display: "flex",gap: "10px",justifyContent: "space-between",padding: "10px"}}>
              <div className="sidebar_logo">
                <p onClick={backHome}>{sideBarOpen ? "PA" : "INFOTEL"}</p>
              </div>
              <div className="close_sidebar_btn" onClick={toggleSidebar}>
                {sideBarOpen ? <FaCircleArrowRight size={20} /> : <FaCircleArrowLeft size={20}/>}
              </div>
            </div>
          </div>
          <div>
            <Menu>
              {/* <MenuItem active={currentPart == "dashboard"} icon={<FaHouse />} onClick={()=>{setCurrentPart("dashboard")}}>
                Dashboard
              </MenuItem> */}
              <MenuItem active={currentPart == "actual-data"} icon={<VscGraphLine />} onClick={()=>{setCurrentPart("actual-data")}}>
                Actual
              </MenuItem>
              <MenuItem active={currentPart == "forecast-data"} icon={<MdOutlineAutoGraph />} onClick={()=>{setCurrentPart("forecast-data")}}>
                Forecast
              </MenuItem>
              <MenuItem active={currentPart == "period-detail"} icon={<SlGraph />} onClick={()=>{setCurrentPart("period-detail")}}>
                Period
              </MenuItem>
            </Menu>
          </div>
        </ProSidebar>
        </div>
      </div>
    );
}

export default SideBar;