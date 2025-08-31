import dashboardPlanet from "@/assets/icons/dashboard-planet.png";
import { Button } from "@/components/ui/button";
import CustomOverviewCard from "@/custom-components/CustomOverviewCard";
import {
  Files,
  MessageSquareText,
  MoveRight,
  WalletMinimal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div className="bg-linear-to-r from-[#1A1F37] to-[#0E0D3990] flex justify-between rounded-3xl">
          <div className="flex flex-col justify-between p-5">
            <div className="flex flex-col gap-4">
              <p className="text-[#A0AEC0] text-sm">Welcome Back,</p>
              <p className="text-[#ffffff] text-3xl ">Mubarak Ibrahim</p>
              <p className="text-[#A0AEC0] text-sm">Glad to see you again!</p>
              <p className="text-[#A0AEC0] text-sm">
                Get started using your dashboard.
              </p>
            </div>
            <div>
              <Button
                onClick={() => navigate("/messages")}
                variant="link"
                size="default"
                className="text-[#ffffff] p-0 font-[lexend] text-xs"
              >
                Send Broadcast <MoveRight className="animate-pulse" />
              </Button>
            </div>
          </div>
          <img src={dashboardPlanet} alt="" className="w-2/4" />
        </div>
        <div>
          <h4 className="my-4">Quick Links</h4>
          <div className="grid grid-cols-3 gap-4">
            {overviewCardItems.map((item) => (
              <CustomOverviewCard
                key={item.id}
                onClick={() => navigate(item.link)}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const overviewCardItems = [
  {
    id: 1,
    title: "Fund Unit Wallet",
    link: "/settings",
    icon: <WalletMinimal className="text-primary" />,
  },
  {
    id: 2,
    title: "Send Message",
    link: "/messages",
    icon: <MessageSquareText className="text-primary" />,
  },
  {
    id: 3,
    title: "Manage Files",
    link: "/files",
    icon: <Files className="text-primary" />,
  },
];

export default Dashboard;
