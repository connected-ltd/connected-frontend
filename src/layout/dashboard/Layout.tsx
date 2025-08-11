import { Box } from "@mui/material";
import { useState } from "react";
import Main from "./Main";
import SideNav from "./SideNav";
import Header from "./Header";

function Layout() {
  const drawerWidth = 265;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />

      <SideNav
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />

      <Main drawerWidth={drawerWidth} />
    </Box>
  );
}

export default Layout;
