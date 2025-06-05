import React, { useEffect } from "react";
import { useTheme } from "../../components/ThemeProvider";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { setForceLight } = useTheme();

  useEffect(() => {
    setForceLight(true);
    return () => setForceLight(false);
  }, [setForceLight]);

  return <div>{children}</div>;
};

export default AuthLayout;
