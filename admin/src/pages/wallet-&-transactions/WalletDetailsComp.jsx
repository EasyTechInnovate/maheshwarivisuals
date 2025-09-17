import React, { useEffect, useRef, useState } from "react";
import { Upload, Plus, Edit, ArrowUpRight, ArrowDownLeft, Download, Trash2 } from "lucide-react";

export default function UserWalletPage({
  theme = "dark",
  user: userProp = null,
  transactions: txProp = [],
  onBack,
  onSave,
}) {
  const isDark = theme === "dark";
  const fileRef = useRef(null);

  const [user, setUser] = useState(userProp || null);
  const [form, setForm] = useState(() => ({
    availableBalance: userProp?.availableBalance ?? "",
    thisMonthEarnings: userProp?.thisMonthEarnings ?? "",
    type: userProp?.type ?? "",
    walletStatus: userProp?.walletStatus ?? "",
    bankAccount: userProp?.bankAccount ?? "",
    irfcCode: userProp?.irfcCode ?? "",
  }));

  const [editing, setEditing] = useState({});
  const [transactions, setTransactions] = useState(Array.isArray(txProp) ? txProp : []);

  useEffect(() => {
    setUser(userProp || null);
    setForm({
      availableBalance: userProp?.availableBalance ?? "",
      thisMonthEarnings: userProp?.thisMonthEarnings ?? "",
      type: userProp?.type ?? "",
      walletStatus: userProp?.walletStatus ?? "",
      bankAccount: userProp?.bankAccount ?? "",
      irfcCode: userProp?.irfcCode ?? "",
    });
  }, [userProp]);

  useEffect(() => {
    setTransactions(Array.isArray(txProp) ? txProp : []);
  }, [txProp]);

  const fmt = (n) => {
    if (n === null || n === undefined || n === "") return "-";
    const num = Number(n);
    return Number.isFinite(num) ? num.toLocaleString("en-IN") : String(n);
  };

  const money = (n) => {
    const num = Number(n);
    if (!Number.isFinite(num)) return "-";
    return num >= 0
      ? `+₹${num.toLocaleString("en-IN")}`
      : `-₹${Math.abs(num).toLocaleString("en-IN")}`;
  };

  const toggleEdit = (k) => setEditing((s) => ({ ...s, [k]: !s[k] }));
  const handleFieldChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const saveUser = () => {
    const updated = {
      ...user,
      availableBalance: Number(form.availableBalance) || 0,
      thisMonthEarnings: Number(form.thisMonthEarnings) || 0,
      type: form.type,
      walletStatus: form.walletStatus,
      bankAccount: form.bankAccount,
      irfcCode: form.irfcCode,
    };
    setUser(updated);
    if (typeof onSave === "function") onSave(updated);
    setEditing({});
    alert("Saved (mock) — replace with API call if needed.");
  };

  const deleteUser = () => {
    if (!confirm("Delete user? This is a mock action.")) return;
    if (typeof onBack === "function") onBack();
    alert("Deleted (mock).");
  };

  const importCsv = () => fileRef.current?.click();
  const handleFileSelected = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    alert(`Selected file: ${f.name} (no parsing here)`);
    e.target.value = "";
  };

  const addTransaction = () => {
    const t = {
      id: `TXN${Math.floor(Math.random() * 100000)}`,
      title: "Manual Adjustment",
      date: new Date().toISOString().slice(0, 10),
      txId: "MANUAL",
      amount: 2500,
      type: "credit",
      status: "Completed",
    };
    setTransactions((s) => [t, ...s]);
  };

  const removeTransaction = (id) => {
    if (!confirm("Remove transaction?")) return;
    setTransactions((s) => s.filter((x) => x.id !== id));
  };

  if (!user) return null;

  return (
    <div
      className={`${
        isDark ? "bg-gray-900 text-slate-300" : "bg-gray-50 text-[#151F28]"
      } min-h-screen p-4 sm:p-8`}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              onClick={onBack}
              className="px-3 py-2 rounded-md bg-transparent border border-[#151F28] text-sm"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-2xl font-semibold">
                User Wallet - {user.name}
              </h1>
              <p className="text-sm text-slate-400">
                Manage artists, labels, and aggregators in Maheshwari Visuals
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={importCsv}
              className="px-3 py-2 rounded-md bg-transparent border border-[#21323a] hover:bg-[#0f1724] flex items-center gap-2 text-sm"
            >
              <Upload className="w-4 h-4" /> Import CSV/Excel
            </button>

            <button
              onClick={addTransaction}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Transactions
            </button>
          </div>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={handleFileSelected}
        />

        {/* Info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { key: "availableBalance", label: "User Available Balance", value: fmt(user.availableBalance) },
            { key: "thisMonthEarnings", label: "This Month Earnings", value: user.thisMonthEarnings || form.thisMonthEarnings || "-" },
            { key: "type", label: "Type", value: user.type },
            { key: "walletStatus", label: "Wallet Status", value: user.walletStatus },
            { key: "bankAccount", label: "Bank Account Number", value: user.bankAccount },
            { key: "irfcCode", label: "IRFC Code", value: user.irfcCode },
          ].map((box) => (
            <div
              key={box.key}
              className={`${
                isDark
                  ? "bg-[#151F28] border border-[#12212a]"
                  : "bg-white border border-gray-200"
              } rounded-md p-4 shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">{box.label}</div>
                <button
                  onClick={() => toggleEdit(box.key)}
                  className="p-1 text-slate-300 hover:text-white rounded"
                  aria-label={`Edit ${box.label}`}
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-3">
                {editing[box.key] ? (
                  <input
                    className={`${
                      isDark
                        ? "bg-gray-900 text-slate-200 border border-[#12212a]"
                        : "bg-gray-100 text-slate-900"
                    } w-full px-3 py-2 rounded-md`}
                    value={form[box.key] ?? box.value ?? ""}
                    onChange={(e) => handleFieldChange(box.key, e.target.value)}
                  />
                ) : (
                  <div
                    className={`${
                      isDark
                        ? "bg-gray-900 text-slate-200"
                        : "bg-gray-100 text-slate-900"
                    } w-full px-3 py-2 rounded-md`}
                  >
                    {box.value}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Transactions card */}
        <div
          className={`${
            isDark ? "bg-[#151F28] border border-[#12212a]" : "bg-white border border-gray-200"
          } rounded-xl p-4 sm:p-6 shadow-md mb-8`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
            <div>
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <p className="text-sm text-slate-400">
                Your recent financial activity
              </p>
            </div>

            <button
              onClick={() => alert("Export transactions (mock)")}
              className="px-3 py-2 rounded-md bg-transparent border border-[#21323a] hover:bg-[#0f1724] text-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export
            </button>
          </div>

          <div className="space-y-3">
            {transactions.map((t) => {
              const isCredit =
                t.type === "credit" || (t.amount && Number(t.amount) > 0);
              return (
                <div
                  key={t.id}
                  className={`${
                    isDark ? "bg-gray-900" : "bg-gray-50"
                  } rounded-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-transparent hover:border-[#12212a]`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        isCredit
                          ? "bg-green-900/40 text-green-400"
                          : "bg-red-900/40 text-red-400"
                      }`}
                    >
                      {isCredit ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <div className="font-medium">
                        {t.title ?? t.description ?? t.txId}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {t.date} · ID: {t.txId ?? t.id}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <div
                        className={`${
                          isCredit ? "text-green-300" : "text-red-300"
                        } font-medium`}
                      >
                        {money(t.amount)}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {t.status}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert("Edit transaction (mock)")}
                        className="p-2 rounded-md bg-transparent border border-[#12212a] text-slate-300 hover:bg-[#0f1724]"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeTransaction(t.id)}
                        className="p-2 rounded-md bg-transparent border border-[#12212a] text-red-400 hover:bg-[#2a0b0f]"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={saveUser}
            className="px-10 py-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white w-full sm:w-auto"
          >
            Save
          </button>
          <button
            onClick={deleteUser}
            className="px-10 py-2 rounded-full border border-red-500 text-red-400 bg-transparent w-full sm:w-auto"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}
