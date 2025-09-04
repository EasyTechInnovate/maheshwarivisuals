import React, { useState, useMemo } from "react";
import { ArrowLeft, IndianRupee, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const INR = new Intl.NumberFormat("en-IN");

export default function WithdrawFund({ backIconSrc }) {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const min = 1000;
  const max = 45000;

  const valid = useMemo(() => {
    const n = Number(amount);
    return Number.isFinite(n) && n >= min && n <= max;
  }, [amount]);

  const recent = [
    { amt: 15000, method: "HDFC Bank", date: "2024-03-10", ref: "TXN123456789", status: "Completed" },
    { amt: 8500, method: "Google Pay", date: "2024-03-15", ref: "TXN123456790", status: "Processing" },
    { amt: 12000, method: "Paytm", date: "2024-03-08", ref: "TXN123456788", status: "Completed" },
  ];

  const onSubmit = () => {
    console.log("Submitting withdrawal:", { amount, remarks });
    setAmount("");
    setRemarks("");
  };

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      <div className="mb-6 flex items-start gap-3">
        <Button
          variant="outline"
          size="icon"
          className='mt-2'
          onClick={() => navigate("/user/finance-and-wallet")}
        >
            <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Withdraw Funds</h1>
          <p className="text-sm text-muted-foreground">
            Transfer your earnings to your preferred payment method
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Available Balance</CardTitle>
            </CardHeader>
            <CardContent className="rounded-lg border bg-muted/30 p-10 text-center">
              <IndianRupee size='40' className="text-[#711CE9] w-full"/>
              <div className="text-3xl font-bold">₹{INR.format(45230)}</div>
              <p className="text-sm text-muted-foreground">Available for withdrawal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Details</CardTitle>
              <CardDescription>Enter the amount and remarks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Withdrawal Amount (₹)
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Minimum: ₹{min}</span>
                  <span>Maximum: ₹{max}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-md border p-3 text-sm">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span>
                  Withdrawal must be between ₹{min} and ₹{max}. Fees may apply.
                </span>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Remarks (Optional)</label>
                <Textarea
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Add notes for your withdrawal request..."
                />
              </div>

              <div className="flex items-start gap-2 rounded-md border p-3 text-sm">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span>Your withdrawal will be sent to admin for approval.</span>
              </div>

              <div className="flex gap-3 w-full">
                <Button className="w-[80%] bg-[#711CE9] text-white hover:bg-[#6f14ef]" disabled={!valid} onClick={onSubmit}>
                  Send Request ₹{INR.format(Number(amount || 0))}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/user/finance-and-wallet")}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Withdrawals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recent.map((r, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">
                      ₹{INR.format(r.amt)} • {r.method}
                    </p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                    <p className="text-xs text-muted-foreground">Ref: {r.ref}</p>
                  </div>
                  <Badge
                    className={
                      r.status === "Completed"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-amber-500/15 text-amber-400"
                    }
                  >
                    {r.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
