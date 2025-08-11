import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import SideBanner from "./components/SideBanner";
import { useEffect } from "react";

const Auth = () => {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    // Optionally, prevent toggling theme on this page
    // Optionally, set a flag in context if you want to disable theme toggler
  }, []);

  return (
    <div className=" h-screen p-6">
      <div className="flex justify-between items-center h-full">
        <div className="w-4/9 h-full">
          <SideBanner />
        </div>
        <div className="w-5/9 h-full flex flex-col justify-center items-center">
          <Tabs defaultValue="signin" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <RegisterForm />
            </TabsContent>

            <TabsContent value="signin">
              <LoginForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
