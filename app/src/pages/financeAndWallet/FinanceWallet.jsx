import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Download,
  Wallet,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Edit3,
  FileDown,
  IndianRupee,
  ArrowDownLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const INR = new Intl.NumberFormat("en-IN");

export default function FinanceWallet() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");

  const statCards = [
    { title: "Available Balance", value: 45230, icon: Wallet , color: "text-green-500" },
    { title: "Pending Royalties", value: 12450, icon: Clock , color: "text-yellow-500" },
    { title: "This Month Earnings", value: 18750, icon: TrendingUp , color: "text-emerald-400" },
    { title: "Total Withdrawn", value: 234560, icon: ArrowDownLeft , color: "text-purple-400" },
  ];

  const earningsData = [
    { month: "Oct", value: 15000 },
    { month: "Nov", value: 17000 },
    { month: "Dec", value: 21000 },
    { month: "Jan", value: 23500 },
    { month: "Feb", value: 18000 },
    { month: "Mar", value: 28000 },
  ];

  const txns = [
    { id: "TXN001", title: "Spotify Royalties - March 2024", date: "2024-03-15", type: "in", amount: 8450, status: "completed" },
    { id: "TXN002", title: "Bank Transfer - HDFC BANK", date: "2024-03-14", type: "out", amount: 15000, status: "completed" },
    { id: "TXN003", title: "Apple Music Royalties", date: "2024-03-13", type: "in", amount: 3250, status: "pending" },
    { id: "TXN004", title: "YouTube Music Revenue", date: "2024-03-12", type: "in", amount: 2100, status: "completed" },
    { id: "TXN005", title: "Platform Fee", date: "2024-03-10", type: "out", amount: 450, status: "completed" },
  ];

  const payoutMethods = [
    { id: 1, kind: "Bank Transfer", sub: "HDFC Bank ****2345", default: true, active: true },
    { id: 2, kind: "UPI", sub: "artist@paytm", default: false, active: true },
    { id: 3, kind: "PayPal", sub: "artist@email.com", default: false, active: false },
  ];

  const statements = [
    { id: "2024-03", label: "March 2024" },
    { id: "2024-02", label: "February 2024" },
    { id: "2024-01", label: "January 2024" },
    { id: "2023-12", label: "December 2023" },
  ];

  const nextPayoutPercent = useMemo(() => (15 / 30) * 100, []);

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Finance & Wallet</h1>
          <p className="text-muted-foreground">
            Manage your payments, transactions, and wallet balance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Statement
          </Button>
          <Button
            className="gap-2 bg-[#711CE9] text-white hover:bg-[#6f14ef]"
            onClick={() => navigate("/user/finance-and-wallet/withdraw-fund")}
          >
            <ArrowDownLeft className="h-4 w-4 " />
            Withdraw Funds
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ title, value, icon: Icon , color}) => (
          <Card key={title} className=' gap-2'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{INR.format(value)}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6 grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payouts">Payout Methods</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Earnings Trend</CardTitle>
                <CardDescription>Your earnings over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={earningsData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                       contentStyle={{
                        backgroundColor: "var(--popover)",
                        color: "var(--popover-foreground)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      labelStyle={{
                        color: "var(--muted-foreground)",
                      }}
                      itemStyle={{
                        color: "var(--foreground)",
                      }}
                      formatter={(v) => [`₹${INR.format(v)}`, "Earnings"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#711CE9"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Payout</CardTitle>
                <CardDescription>Scheduled payout information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-lg border bg-muted/30 p-8 text-center">
                  <IndianRupee size='40' className="text-[#711CE9] w-full"/>
                  <div className="text-2xl font-bold">₹18,750</div>
                  <p className="text-sm text-muted-foreground">Expected payout amount</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Payout Progress</span>
                    <span>15/30 days</span>
                  </div>
                  <Progress value={nextPayoutPercent} className='bg-muted-foreground/10 [&>div]:bg-[#711CE9]'/>
                  <p className="text-xs text-muted-foreground">
                    Next payout on April 1st, 2024
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions */}
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {txns.map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.date} • ID: {t.id}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className={t.status === "completed" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}
                    >
                      {t.status}
                    </Badge>
                    <div className={t.type === "in" ? "text-emerald-400" : "text-rose-400"}>
                      {t.type === "in" ? "+" : "-"}₹{INR.format(t.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payout Methods */}
        <TabsContent value="payouts">
          <Card>
            <CardHeader>
              <CardTitle>Payout Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {payoutMethods.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">{m.kind}</p>
                    <p className="text-xs text-muted-foreground">{m.sub}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {m.default && <Badge className="bg-primary/15 text-primary">Default</Badge>}
                    <Badge className={m.active ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}>
                      {m.active ? "Active" : "Inactive"}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Edit3 className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </div>
                </div>
              ))}
              <button className="mx-auto block w-full rounded-md border border-dashed py-3 text-center text-sm text-muted-foreground hover:bg-muted/20">
                + Add New Payout Method
              </button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statements */}
        <TabsContent value="statements">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Statements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {statements.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground">Financial statement</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileDown className="mr-2 h-4 w-4" /> Download PDF
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
