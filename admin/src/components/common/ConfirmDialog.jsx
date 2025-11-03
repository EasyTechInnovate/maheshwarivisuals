import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ConfirmDialog({ title, message, onConfirm, onCancel, theme }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`p-6 rounded-2xl shadow-xl w-[90%] max-w-sm ${
          theme === "dark" ? "bg-[#151F28] text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-lg font-semibold mb-2">{title || "Confirm"}</h2>
        <p className="text-sm text-gray-500 mb-5">{message}</p>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className={`${
              theme === "dark"
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
