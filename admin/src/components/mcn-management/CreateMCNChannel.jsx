import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateMCNChannelModal({ isOpen, onClose, channelTypes = [], theme = "dark" }) {
    const isDark = theme === "dark";
    const [channelName, setChannelName] = useState("");
    const [channelType, setChannelType] = useState("");
    const [revenueShare, setRevenueShare] = useState("");
    const [managerName, setManagerName] = useState("");
    const [description, setDescription] = useState("");
    const [supportedPlatforms, setSupportedPlatforms] = useState([]);

    const platforms = ["YouTube", "Spotify", "Apple Music", "Instagram", "TikTok", "SoundCloud"];

    useEffect(() => {
        if (!isOpen) {
            // Reset form when modal closes
            setChannelName("");
            setChannelType("");
            setRevenueShare("");
            setManagerName("");
            setDescription("");
            setSupportedPlatforms([]);
        }
    }, [isOpen]);

    const togglePlatform = (platform) => {
        setSupportedPlatforms((prev) =>
            prev.includes(platform)
                ? prev.filter((p) => p !== platform)
                : [...prev, platform]
        );
    };

    const handleSubmit = () => {
        const payload = {
            channelName,
            channelType,
            revenueShare,
            managerName,
            description,
            supportedPlatforms,
        };
        console.log("MCN Channel payload:", payload);
        // Placeholder for future API integration
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className={`max-w-lg rounded-lg ${isDark ? "bg-[#111A22] text-gray-200" : "bg-white text-[#151F28]"
                    }`}
            >
                <DialogHeader>
                    <DialogTitle>Create New MCN Channel</DialogTitle>
                    <p className="text-sm text-gray-400">Set up a new Multi-Channel Network with revenue sharing and user management</p>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <Input
                        placeholder="Enter MCN channel name"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                    />

                    <div className="flex space-x-4">
                        <Select value={channelType} onValueChange={setChannelType}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>

                            <SelectContent
                                className={`${isDark ? "bg-gray-800 text-gray-200 border-gray-700" : "bg-white text-[#111A22] border-gray-300"
                                    }`}
                            >
                                {channelTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.name}>
                                        {type.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>


                        <Input
                            type="text"
                            placeholder="e.g., 60/40"
                            value={revenueShare}
                            onChange={(e) => setRevenueShare(e.target.value)}
                            className="flex-1"
                        />
                    </div>

                    <Input
                        placeholder="Manager name"
                        value={managerName}
                        onChange={(e) => setManagerName(e.target.value)}
                    />

                    <Textarea
                        placeholder="Channel description and focus"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div>
                        <p className="mb-2">Supported Platforms</p>
                        <div className="grid grid-cols-3 gap-2">
                            {platforms.map((platform) => (
                                <label key={platform} className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={supportedPlatforms.includes(platform)}
                                        onCheckedChange={() => togglePlatform(platform)}
                                    />
                                    <span>{platform}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>Create MCN Channel</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
