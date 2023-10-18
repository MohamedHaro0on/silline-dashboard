import { useContext } from "react";
import { Button, Grid } from "@mui/material";
import { UserContext } from "../../context/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LanguageContext from "../../context/langContext";

import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DarkModeContext from "../../context/darkModeContext";
import strings from "../../assets/locals/locals";

function Navbar() {
  const { toggleDarkMode } = useContext(DarkModeContext);
  const user = useContext(UserContext);
  const { lang, setLangToAr, setLangToEn } = useContext(LanguageContext);
  const history = useNavigate();

  strings.setLanguage(lang);

  const handleLogout = () => {
    user.logout();
    toast("Success", "Logged Out Successfully");
    history("/");
  };

  return (
    <Grid item xs={12} md={12} lg={12} padding = {3} className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <Button className = "mainBtn" variant="outlined" onClick={handleLogout}>
              {strings.logOut}
            </Button>
          </div>

          <div className="item">
            <Button className = "mainBtn" variant="outlined" onClick={setLangToAr}>
              لغة عربية
            </Button>
          </div>
          <div className="item">
            <Button className = "mainBtn" variant="outlined" onClick={setLangToEn}>
              en
            </Button>
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className="icon" onClick={toggleDarkMode} />
          </div>
        </div>
      </div>
    </Grid>
  );
}
export default Navbar;
