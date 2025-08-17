import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Settingstabs";
import Account from "./settings-tabs/Account";
import Permissions from "./settings-tabs/Permissions";
import Payments from "./settings-tabs/Payments";
import Users from "./settings-tabs/Users";
import PageHeader from "@/components/ui/PageHeader";

const Settings = () => {
  return (
    <div>
      <div>
        <PageHeader
          header={"Settings"}
          subHeader={"Please update your profile settings here"}
        />
      </div>
      <div className="my-4 w-full bg-bg-primary rounded-lg">
        <Tabs defaultValue="account" className="w-full rounded-lg">
          <TabsList className="grid w-full grid-cols-4 rounded-lg">
            <TabsTrigger value="account" className="rounded-t-lg">
              Account
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-t-lg">
              Users
            </TabsTrigger>
            <TabsTrigger value="permissions" className="rounded-t-lg">
              Permissions
            </TabsTrigger>
            <TabsTrigger value="payments" className="rounded-t-lg">
              Payments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <div className="px-6 py-4">
              <Account />
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="px-6 py-4">
              <Users />
            </div>
          </TabsContent>

          <TabsContent value="permissions">
            <div className="px-6 py-4">
              <Permissions />
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <div className="px-6 py-4">
              <Payments />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
