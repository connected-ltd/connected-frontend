import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";

const Permissions = () => {
  const [notifyOption, setNotifyOption] = useState("all");
  const [emailSettings, setEmailSettings] = useState({
    communication: false,
    marketing: false,
    social: true,
    security: false,
  });

  const handleToggle = (type: keyof typeof emailSettings) => {
    setEmailSettings((prev) => {
      const newState = !prev[type];
      console.log(`Toggled "${type}" to ${newState}`);
      return {
        ...prev,
        [type]: newState,
      };
    });
  };

  const handleRadioChange = (value: string) => {
    setNotifyOption(value);
    console.log(`Notification setting changed to: "${value}"`);
  };

  const handleUpdate = () => {
    console.log("Preferences updated", {
      notifyOption,
      emailSettings,
    });
  };

  return (
    <div>
      {/* Notification Settings */}
      <div className="flex gap-10">
        <h2 className="text-lg font-semibold mb-2">Notification Settings</h2>
        <div className="space-y-2">
          {["All new messages", "Direct messages and mentions", "Nothing"].map(
            (label, idx) => {
              const value = ["all", "direct", "none"][idx];
              return (
                <label
                  key={value}
                  className="flex items-center space-x-2 text-text-primary"
                >
                  <input
                    type="radio"
                    name="notify"
                    value={value}
                    checked={notifyOption === value}
                    onChange={() => handleRadioChange(value)}
                  />
                  <span>{label}</span>
                </label>
              );
            }
          )}
        </div>
      </div>

      <hr className="border-gray-300 my-2" />

      {/* Email Notifications */}
      <div className="flex gap-10">
        <h2 className="text-lg font-semibold">Email Notifications</h2>
        <div>
          {[
            {
              key: "communication",
              title: "Communication emails",
              desc: "Receive emails about your account activity.",
            },
            {
              key: "marketing",
              title: "Marketing emails",
              desc: "Receive emails about new products, features, and more.",
            },
            {
              key: "social",
              title: "Social emails",
              desc: "Receive emails for friend requests, follows, and more.",
            },
            {
              key: "security",
              title: "Security emails",
              desc: "Receive emails about your account security.",
            },
          ].map(({ key, title, desc }) => (
            <div
              key={key}
              className="flex justify-between items-center bg-bg-primary px-4 py-3 rounded-lg shadow-sm"
            >
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailSettings[key as keyof typeof emailSettings]}
                  onChange={() =>
                    handleToggle(key as keyof typeof emailSettings)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bg-primary-dark2" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Update Button */}
      <div className="text-right">
        <Button onClick={handleUpdate}>
          <Check /> Update Preferences
        </Button>
      </div>
    </div>
  );
};

export default Permissions;
