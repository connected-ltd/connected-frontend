import { Menu, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  drawerWidth: number;
  handleDrawerToggle: () => void;
};

function Header({ drawerWidth, handleDrawerToggle }: Props) {
  // Extract the value for CSS custom properties
  const cssVars = {
    "--drawer-width": `${drawerWidth}px`,
  } as React.CSSProperties;

  const [darkMode, setDarkMode] = useState(false);
  //  <IconButton onClick={toggleColorMode}>
  //                 {mode === "dark" ? <LightMode /> : <DarkMode />}
  //               </IconButton>

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div
      style={cssVars}
      className="fixed shadow-none bg-bg-primary border-b border-[#e7e7e7] py-2 px-4 w-full sm:w-[calc(100%_-_var(--drawer-width))] sm:ml-[var(--drawer-width)]"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between sm:justify-end w-full">
          <Button
            className="mr-2 sm:hidden flex justify-center items-center"
            variant="default"
            size="icon"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </Button>
          <Button
            className="mr-2 flex justify-center items-center"
            variant="default"
            size="icon"
            onClick={toggleDarkMode}
          >
            <Sun />
          </Button>
        </div>
        <div className="flex-grow"></div>
      </div>
    </div>
  );
}

export default Header;
