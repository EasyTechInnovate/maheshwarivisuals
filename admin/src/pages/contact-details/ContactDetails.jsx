import ContactDetailsManager from "./ContactDetailsComp1";
import BusinessDetailsManager from "./ContactDetailsComp2";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import { contactDetailsMock } from "./ContactDetailsData";

export default function ContactPage({ theme = "dark" }) {
    const isDark = theme === "dark";

    const handleSaveAll = async (data) => {
        console.log("Combined Contact Page payload →", data);
    };

    const wrap = (cls = "") =>
        `rounded-xl border ${isDark ? "bg-[#151F28] border-gray-700" : "bg-white border-gray-200"
        } ${cls}`;

    return (
        <div className="space-y-10">
            {/* Contact Details */}
            <ContactDetailsManager
                theme={theme}
                initialData={contactDetailsMock}
                onSave={(payload) => handleSaveAll({ ...payload, section: "contact" })}
            />

            {/* Business Details */}
            <BusinessDetailsManager
                theme={theme}
                initialData={contactDetailsMock}
                onSave={(payload) => handleSaveAll({ ...payload, section: "business" })}
            />

            {/* Preview Section */}
            <Card className={`${wrap()} mt-8`}>
                <div
                    className={`px-6 py-4 border-b ${isDark ? "border-[#151F28]" : "border-gray-200"
                        }`}
                >
                    <h2 className="text-lg font-semibold">Contact Information Preview</h2>
                    <p className="text-sm text-gray-400">
                        This is how your contact information will appear to users
                    </p>
                </div>

                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Phone Numbers */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <h3 className="font-medium">Phone Numbers</h3>
                            </div>
                            <ul className="space-y-4 text-sm">
                                {contactDetailsMock.phones.map((p) => (
                                    <li key={p.id}>
                                        <p className="text-gray-400">{p.label}</p>
                                        <p className="text-gray-200 font-medium">{p.value}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Email Addresses */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <h3 className="font-medium">Email Addresses</h3>
                            </div>
                            <ul className="space-y-4 text-sm">
                                {contactDetailsMock.emails.map((e) => (
                                    <li key={e.id}>
                                        <p className="text-gray-400">{e.label}</p>
                                        <p className="text-gray-200 font-medium">{e.value}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Address + Website + Hours */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <h3 className="font-medium">Address & Website</h3>
                            </div>
                            <div className="space-y-4 text-sm">
                                {contactDetailsMock.addresses?.[0]?.value && (
                                    <div>
                                        <p className="text-gray-400">Office Address</p>
                                        <p className="text-gray-200 font-medium">
                                            {contactDetailsMock.addresses[0].value}
                                        </p>
                                    </div>
                                )}
                                {contactDetailsMock.website?.value && (
                                    <div>
                                        <p className="text-gray-400">Official Website</p>
                                        <a
                                            href={contactDetailsMock.website.value}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-purple-400 hover:underline font-medium"
                                        >
                                            {contactDetailsMock.website.value}
                                        </a>
                                    </div>
                                )}
                                {contactDetailsMock.hours?.value && (
                                    <div>
                                        <p className="text-gray-400">Business Hours</p>
                                        <p className="text-gray-200 font-medium whitespace-pre-line">
                                            {contactDetailsMock.hours.value}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
