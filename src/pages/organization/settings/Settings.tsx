import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Settingstabs";
import Account from "./settings-tabs/Account";
import Permissions from "./settings-tabs/Permissions";
import Payments from "./settings-tabs/Payments";
// import Users from "./settings-tabs/Users";
import ChangePassword from "./settings-tabs/ChangePassword";
import PageHeader from "@/components/ui/PageHeader";

const Settings = () => {
  return (
    <div>
      <div>
        <PageHeader
          header={"Settings"}
          subHeader={"Update your profile settings here"}
        />
      </div>
      <div className="my-4 w-full bg-bg-primary rounded-lg">
        <Tabs defaultValue="payments" className="w-full rounded-lg">
          <TabsList className="grid w-full grid-cols-3 rounded-lg">
            <TabsTrigger value="payments" className="rounded-t-lg">
              Payments
            </TabsTrigger>
            <TabsTrigger value="account" className="rounded-t-lg">
              Account
            </TabsTrigger>
            {/* <TabsTrigger value="users" className="rounded-t-lg">
              Users
            </TabsTrigger> */}
            <TabsTrigger value="permissions" className="rounded-t-lg">
              Permissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payments">
            <div className="px-6 py-4">
              <Payments />
            </div>
          </TabsContent>

          <TabsContent value="account">
            <div className="px-6 py-4 flex flex-col gap-8 lg:flex-row justify-between items-start">
              <div className="w-full max-w-md lg:w-2/5">
                <Account />
              </div>
              <div className="w-full max-w-md lg:w-2/5">
                <ChangePassword />
              </div>
            </div>
          </TabsContent>

          {/* <TabsContent value="users">
            <div className="px-6 py-4">
              <Users />
            </div>
          </TabsContent> */}

          <TabsContent value="permissions">
            <div className="px-6 py-4">
              <Permissions />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
