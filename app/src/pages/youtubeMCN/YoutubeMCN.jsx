import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Eye, Edit, Download } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useNavigate } from "react-router-dom"

export default function YouTubeMCN() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("release")

  // Fake data for now
  const yourReleases = [
    { 
      label: "Rajesh Kumar", 
      product: "T-Shirts", 
      plan: "Yes", 
      channel: "Instagram", 
      assist: "No", 
      status: "Pending", 
      date: "2024-03-15" 
    },
    { 
      label: "Rajesh Kumar", 
      product: "Hoodies", 
      plan: "No", 
      channel: "N/A", 
      assist: "Yes", 
      status: "Pending", 
      date: "2024-03-10" 
    },
    { 
      label: "Rajesh Kumar", 
      product: "T-Shirts", 
      plan: "Yes", 
      channel: "YouTube", 
      assist: "No", 
      status: "Pending", 
      date: "2024-03-08" 
    },
    { 
      label: "Rajesh Kumar", 
      product: "T-Shirts", 
      plan: "No", 
      channel: "N/A", 
      assist: "Yes", 
      status: "Pending", 
      date: "2024-03-05" 
    }
  ]

  const activeChannels = [
    { name: "Rajesh Kumar", percent: "20%", status: "Pending", date: "2024-03-15" },
    { name: "Rajesh Kumar", percent: "30%", status: "Pending", date: "2024-03-10" },
    { name: "Rajesh Kumar", percent: "80%", status: "Pending", date: "2024-03-08" },
    { name: "Rajesh Kumar", percent: "90%", status: "Pending", date: "2024-03-05" },
  ]

  // Chart data for Revenue by Platform
  const chartData = [
    { name: "Platform A", value: 35, color: "#22c55e" },
    { name: "Platform B", value: 25, color: "#ef4444" },
    { name: "Platform C", value: 20, color: "#3b82f6" },
    { name: "Platform D", value: 15, color: "#10b981" },
    { name: "Platform E", value: 5, color: "#8b5cf6" },
  ]

  const handleView = (index) => {
    console.log('View item:', index)
  }

  const handleEdit = (index) => {
    console.log('Edit item:', index)
  }

  const handleExport = (index) => {
    console.log('Export item:', index)
  }

  const handleOptRequest = (index) => {
    console.log('Opt Request for item:', index)
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">YouTube MCN</h1>
          <p className="text-muted-foreground">Create and manage marketing campaigns for your music</p>
        </div>
        <Button onClick={() => navigate('/app/youtube-mcn/new-request')} className="bg-[#711CE9] hover:bg-[#6f14ef] text-white">
          + New Request
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full max-w-lg grid grid-cols-2 mb-6">
          <TabsTrigger value="release">Your Release</TabsTrigger>
          <TabsTrigger value="channels">Active Channel</TabsTrigger>
        </TabsList>

        {/* Your Release Tab */}
        <TabsContent value="release">
          {yourReleases.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Your Releases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto custom-scroll">
                  <table className="w-full text-sm">
                    <thead className="text-left text-muted-foreground">
                      <tr>
                        <th className="p-2">Artist's Label Name</th>
                        <th className="p-2">Product Preferences</th>
                        <th className="p-2">Marketing & Launch Plan</th>
                        <th className="p-2">Channel</th>
                        <th className="p-2">MMC Assist</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Submit Date</th>
                        <th className="p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yourReleases.map((r, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="p-2">{r.label}</td>
                          <td className="p-2">{r.product}</td>
                          <td className="p-2">{r.plan}</td>
                          <td className="p-2">{r.channel}</td>
                          <td className="p-2">{r.assist}</td>
                          <td className="p-2">
                            <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400">
                              {r.status}
                            </span>
                          </td>
                          <td className="p-2">{r.date}</td>
                          <td className="p-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(i)}
                              className=" p-0"
                            >
                              <Eye className="h-4 w-4" /> View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <p className="text-center text-muted-foreground">No releases found.</p>
          )}
        </TabsContent>

        {/* Active Channels Tab */}
        <TabsContent value="channels">
          <div className="space-y-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Active Channels Table */}
            {activeChannels.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Active Channels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto custom-scroll">
                    <table className="w-full text-sm">
                      <thead className="text-left text-muted-foreground">
                        <tr >
                          <th className="p-2">Channel Name</th>
                          <th className="p-2">% Taken</th>
                          <th className="p-2">Status</th>
                          <th className="p-2">Submit Date</th>
                          <th className="p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeChannels.map((c, i) => (
                          <tr key={i} className="border-t border-border">
                            <td className="p-2">{c.name}</td>
                            <td className="p-2">{c.percent}</td>
                            <td className="p-2">
                              <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400">
                                {c.status}
                              </span>
                            </td>
                            <td className="p-2">{c.date}</td>
                            <td className="p-2">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleOptRequest(i)}
                                  className="bg-[#711CE9] hover:bg-[#5e17c2] text-white text-xs px-3 py-1 h-auto"
                                >
                                  Opt Request
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(i)}
                                  className=" p-0"
                                >
                                  <Edit className="h-4 w-4" /> Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleExport(i)}
                                  className=" p-0"
                                >
                                  <Download className="h-4 w-4" /> Export
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <p className="text-center text-muted-foreground">No active channels yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}