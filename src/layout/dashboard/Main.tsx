import { Outlet } from "react-router-dom";
import Footer from "./Footer";

type Props = {
  drawerWidth: number;
};

function Main({ drawerWidth }: Props) {
  return (
    <main
      style={{ "--drawer-width": `${drawerWidth}px` } as React.CSSProperties}
      className="sm:w-[calc(100%_-_var(--drawer-width))] flex-grow min-h-screen flex flex-col"
    >
      <div className="py-15 px-5 bg-[#F6F5F4] flex-1">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default Main;
