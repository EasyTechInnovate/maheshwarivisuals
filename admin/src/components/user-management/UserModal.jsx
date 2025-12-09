import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SquarePen } from "lucide-react";


function InputField({ label, value, onChange, readOnly = false, theme }) {
  const containerClasses =
    theme === "dark"
      ? "bg-[#151F28] border-gray-800"
      : "bg-white border-gray-300";

  const inputClasses =
    theme === "dark"
      ? "bg-gray-800 text-gray-200"
      : "bg-gray-100 text-[#111A22]";

  return (
    <div
      className={`flex flex-col space-y-2 p-3 border rounded-xl ${containerClasses}`}
    >
      <label
        className={`text-sm font-medium ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {label}
      </label>
      <div className="flex items-center">
       
        <Input
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          className={`flex-1 ${inputClasses} border-none rounded-lg focus:ring-2 focus:ring-purple-600 px-3`}
        />
        {!readOnly && (
          <button
            type="button"
            className={`ml-2 ${
              theme === "dark"
                ? "text-gray-400 hover:text-purple-500"
                : "text-gray-500 hover:text-purple-600"
            }`}
          >
            <SquarePen className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function UserInfoPage({ theme, defaultData, onBack, onSave }) {
  const [formData, setFormData] = useState({
    userId: "",
    stageName: "",
    accountType: "",
    status: "",
    membershipStatus: "",
    email: "",
    adhaarNumber: "",
    panNumber: "",
    bankNumber: "",
    kycStatus: "",
    joinDate: "",
    subscriptionType: "",
    modules: [],
  });

  useEffect(() => {
    if (defaultData) {
      setFormData({
        userId: defaultData.id || "",
        stageName: defaultData.stageName || "",
        accountType: defaultData.accountType || "",
        status: defaultData.status || "",
        membershipStatus: defaultData.membership || "",
        email: defaultData.email || "",
        adhaarNumber: defaultData.adhaarNumber || "",
        panNumber: defaultData.panNumber || "",
        bankNumber: defaultData.bankNumber || "",
        kycStatus: defaultData.kycStatus || "",
        joinDate: defaultData.joinDate || "",
        subscriptionType: defaultData.subscriptionType || "",
        modules: defaultData.modules || [],
      });
    }
  }, [defaultData]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleModule = (module) => {
    setFormData((prev) => {
      const modules = prev.modules.includes(module)
        ? prev.modules.filter((m) => m !== module)
        : [...prev.modules, module];
      return { ...prev, modules };
    });
  };

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === "dark"
          ? "bg-[#111A22] text-gray-200"
          : "bg-gray-50 text-[#151F28]"
      }`}
    >
   
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          User Information - {formData.stageName || "New User"}
        </h1>
        <Button variant="outline" onClick={onBack}>
          ← Back to User List
        </Button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { label: "User ID", key: "userId" },
          { label: "Stage Name", key: "stageName" },
          { label: "Account Type", key: "accountType" },
          { label: "Status", key: "status" },
          { label: "Membership Status", key: "membershipStatus" },
          { label: "Email", key: "email" },
          { label: "Adhaar Number", key: "adhaarNumber" },
          { label: "Pan Number", key: "panNumber" },
          { label: "Bank Number", key: "bankNumber" },
          { label: "KYC Status", key: "kycStatus" },
          { label: "Join Date", key: "joinDate" },
          { label: "Subscription Type", key: "subscriptionType" },
        ].map(({ label, key, readOnly }) => (
          <InputField
            key={key}
            label={label}
            value={formData[key]}
            readOnly={readOnly}
            theme={theme} 
            onChange={(e) => handleChange(key, e.target.value)}
          />
        ))}
      </div>

    
      <div className="mt-6">
        <p
          className={`font-medium mb-2 ${
            theme === "dark" ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Modules
        </p>
        <div className="flex flex-wrap gap-4">
          {[
            "MV Marketing",
            "Advertising",
            "Merch Store",
            "MV Production",
            "MCN",
            "Fan Link Builder",
          ].map((module) => (
            <label key={module} className="flex items-center space-x-2">
              <Checkbox
                checked={formData.modules.includes(module)}
                onCheckedChange={() => toggleModule(module)}
                className="scale-90"
              />
              <span
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {module}
              </span>
            </label>
          ))}
        </div>
      </div>

      
      <div className="flex justify-center space-x-4 mt-8">
        <Button
          variant="outline"
          onClick={() => console.log("User deleted")}
          className="w-40"
        >
          Delete User
        </Button>
        <Button
          className="bg-purple-600 text-white w-40"
          onClick={() => onSave(formData)}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
