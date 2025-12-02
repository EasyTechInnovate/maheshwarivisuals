import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ConfirmDialog({
  title = "Confirm",
  message = "",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  theme,
  loading = false,
}) {
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-[1px]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className={`p-6 rounded-2xl shadow-xl w-[90%] max-w-sm transition-all ${
          isDark ? "bg-[#151F28] text-white" : "bg-white text-gray-900"
        }`}
      >
        
        <h2 className="text-lg font-semibold mb-2">{title}</h2>

       
        <p
          className={`text-sm mb-5 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {message}
        </p>

     
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            className={`${
              isDark
                ? "border-gray-500 text-gray-300 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cancelLabel}
          </Button>

          <Button
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? "Please wait..." : confirmLabel}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
