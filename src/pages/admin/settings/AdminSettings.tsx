import ChangePassword from "@/pages/organization/settings/settings-tabs/ChangePassword";
import Account from "./Account";
import PageHeader from "@/components/ui/PageHeader";

const AdminSettings = () => {
  return (
    <div>
      <div>
        <PageHeader
          header={"Settings"}
          subHeader={"Update your profile settings here"}
        />
      </div>
      <div className="my-4 w-full bg-bg-primary rounded-lg">
        <div className="px-6 py-4 flex flex-col gap-8 lg:flex-row justify-between items-start">
          <div className="w-full max-w-md lg:w-2/5">
            <Account />
          </div>
          <div className="w-full max-w-md lg:w-2/5">
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
