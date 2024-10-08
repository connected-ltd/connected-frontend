import { Box } from "@mui/material";
import { useState } from "react";
import Main from "./Main";
import SideNav from "./SideNav";

function Layout() {
  const drawerWidth = 265;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* <Header
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
     */}

      <SideNav
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />

      <Main handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
    </Box>
  );
}

export default Layout;
