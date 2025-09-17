import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function CreateSubscriptionPlanModal({ isOpen, onClose, categories = [], theme = "dark" }) {
  const isDark = theme === "dark";
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([{ id: Date.now(), description: "" }]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setPlanName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setFeatures([{ id: Date.now(), description: "" }]);
      setIsActive(true);
    }
  }, [isOpen]);

  const handleFeatureChange = (id, value) => {
    setFeatures(features.map(f => (f.id === id ? { ...f, description: value } : f)));
  };

  const addFeature = () => {
    setFeatures([...features, { id: Date.now(), description: "" }]);
  };

  const removeFeature = (id) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  const handleSubmit = () => {
    const payload = {
      planName,
      price,
      category,
      description,
      features: features.map(f => f.description),
      isActive,
    };
    console.log("Submit payload:", payload);
    // Placeholder for future API integration
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-lg rounded-lg ${
          isDark ? "bg-gray-900 text-gray-200" : "bg-white text-[#151F28]"
        }`}
      >
        <DialogHeader>
          <DialogTitle>Create New Subscription Plan</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex space-x-4">
            <Input
              placeholder="e.g., Professional"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="flex-1"
            />
            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-24"
            />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Textarea
            placeholder="Describe what this plan offers..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="space-y-2">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-2">
                <Input
                  placeholder="Feature description"
                  value={feature.description}
                  onChange={(e) => handleFeatureChange(feature.id, e.target.value)}
                />
                <Button variant="destructive" size="sm" onClick={() => removeFeature(feature.id)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addFeature}>
              Add Feature
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Switch checked={isActive} onCheckedChange={setIsActive} />
            <span>Plan is active</span>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Create Plan</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
