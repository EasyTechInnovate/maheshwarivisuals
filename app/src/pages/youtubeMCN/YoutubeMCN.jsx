import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Eye, Edit, Download, Loader2, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getMyMcnRequests, getMyMcnChannels, requestMcnRemoval } from "../../services/api.services"
import { showToast } from "../../utils/toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: "bg-yellow-500/20 text-yellow-500",
    approved: "bg-green-500/20 text-green-500",
    active: "bg-green-500/20 text-green-500",
    rejected: "bg-red-500/20 text-red-500",
    removal_requested: "bg-orange-500/20 text-orange-500",
  }
  const className = statusConfig[status] || "bg-gray-500/20 text-gray-400"
  return (
    <Badge className={className}>
      {status?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
    </Badge>
  )
}

const RequestDetailsModal = ({ request, isOpen, onClose }) => {
  if (!request) return null

  const DetailItem = ({ label, value }) => (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value ?? "N/A"}</p>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Request Details</DialogTitle>
          <DialogDescription>
            Details for channel: {request.youtubeChannelName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 py-4 max-h-[70vh] overflow-y-auto">
          <DetailItem label="Channel Name" value={request.youtubeChannelName} />
          <div>
            <p className="text-sm text-muted-foreground">Channel ID or Link</p>
            <p className="font-medium truncate" title={request.youtubeChannelId}>
              {request.youtubeChannelId ?? "N/A"}
            </p>
          </div>
          <DetailItem label="Subscribers" value={request.subscriberCount?.toLocaleString()} />
          <DetailItem label="Views (28 days)" value={request.totalViewsCountsIn28Days?.toLocaleString()} />
          <DetailItem label="Status" value={<StatusBadge status={request.status} />} />
          <DetailItem label="Monetized" value={request.monetizationEligibility ? "Yes" : "No"} />
          <DetailItem label="AdSense Enabled" value={request.isAdSenseEnabled ? "Yes" : "No"} />
          <DetailItem label="Copyright Strikes" value={request.hasCopyrightStrikes ? "Yes" : "No"} />
          <DetailItem label="Original Content" value={request.isContentOriginal ? "Yes" : "No"} />
          <DetailItem label="In another MCN" value={request.isPartOfAnotherMCN ? "Yes" : "No"} />
          {request.isPartOfAnotherMCN && <DetailItem label="Other MCN" value={request.otherMCNDetails} />}
          <DetailItem label="Revenue (Last Month)" value={`$${request.channelRevenueLastMonth}`} />
          <DetailItem label="Submitted At" value={new Date(request.createdAt).toLocaleDateString()} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function YouTubeMCN() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState("requests")
  const [requestsPage, setRequestsPage] = useState(1)
  const [channelsPage, setChannelsPage] = useState(1)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsPerPage = 10

  const { data: requestsData, isLoading: isLoadingRequests } = useQuery({
    queryKey: ["myMcnRequests", requestsPage],
    queryFn: () => getMyMcnRequests({ page: requestsPage, limit: itemsPerPage }),
    keepPreviousData: true,
  })
  const myRequests = requestsData?.data?.requests || []
  const requestsPagination = requestsData?.data?.pagination

  const { data: channelsData, isLoading: isLoadingChannels } = useQuery({
    queryKey: ["myMcnChannels", channelsPage],
    queryFn: () => getMyMcnChannels({ page: channelsPage, limit: itemsPerPage }),
    keepPreviousData: true, enabled: activeTab === "channels",
  })
  const activeChannels = channelsData?.data?.channels || []
  const channelsPagination = channelsData?.data?.pagination

  const { mutate: requestRemoval, isLoading: isRequestingRemoval } = useMutation({
    mutationFn: requestMcnRemoval,
    onSuccess: () => {
      showToast.success("Channel removal request submitted.")
      queryClient.invalidateQueries({ queryKey: ["myMcnChannels"] })
    },
    onError: (error) => {
      showToast.error(error.response?.data?.message || "Failed to submit removal request.")
    },
  })

  const handleOptRequest = (channel) => {
    if (window.confirm("Are you sure you want to request removal for this channel?")) {
      requestRemoval(channel.mcnRequestId._id)
    }
  }

  // Chart data for Revenue by Platform
  const chartData = [
    { name: "Platform A", value: 35, color: "#22c55e" },
    { name: "Platform B", value: 25, color: "#ef4444" },
    { name: "Platform C", value: 20, color: "#3b82f6" },
    { name: "Platform D", value: 15, color: "#10b981" },
    { name: "Platform E", value: 5, color: "#8b5cf6" },
  ]

  const handleViewDetails = (request) => {
    setSelectedRequest(request)
    setIsModalOpen(true)
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
        <TabsList className="w-full max-w-md grid grid-cols-2 mb-6">
          <TabsTrigger value="requests">My Requests</TabsTrigger>
          <TabsTrigger value="channels">Active Channel</TabsTrigger>
        </TabsList>

        {/* My Requests Tab */}
        <TabsContent value="requests">
          {isLoadingRequests ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : myRequests.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>My Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto custom-scroll">
                  <table className="w-full text-sm">
                    <thead className="text-left text-muted-foreground">
                      <tr className="whitespace-nowrap">
                        <th className="p-2">Channel Name</th>
                        <th className="p-2">Subscribers</th>
                        <th className="p-2">Monetized</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Submit Date</th>
                        <th className="p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myRequests.map((request) => (
                        <tr key={request._id} className="border-t border-border whitespace-nowrap">
                          <td className="p-2 font-medium">{request.youtubeChannelName}</td>
                          <td className="p-2">{request.subscriberCount.toLocaleString()}</td>
                          <td className="p-2">{request.monetizationEligibility ? "Yes" : "No"}</td>
                          <td className="p-2">
                            <StatusBadge status={request.status} />
                          </td>
                          <td className="p-2">{new Date(request.createdAt).toLocaleDateString()}</td>
                          <td className="p-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(request)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-3 w-3" /> View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {requestsPagination && requestsPagination.totalPages > 1 && (
                  <PaginationControls
                    pagination={requestsPagination}
                    onPageChange={setRequestsPage}
                  />
                )}
              </CardContent>
            </Card>
          ) : (
            <p className="text-center text-muted-foreground py-10">No MCN requests found.</p>
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
            {isLoadingChannels ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : activeChannels.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Active Channels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto custom-scroll">
                    <table className="w-full text-sm">
                      <thead className="text-left text-muted-foreground">
                        <tr className="whitespace-nowrap">
                          <th className="p-2">Channel Name</th>
                          <th className="p-2">Revenue Share</th>
                          <th className="p-2">Status</th>
                          <th className="p-2">Joined Date</th>
                          <th className="p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeChannels.map((channel) => (
                          <tr key={channel._id} className="border-t border-border whitespace-nowrap">
                            <td className="p-2 font-medium">{channel.channelName}</td>
                            <td className="p-2">{channel.revenueShare}%</td>
                            <td className="p-2">
                              <StatusBadge status={channel.status} />
                            </td>
                            <td className="p-2">{new Date(channel.joinedDate).toLocaleDateString()}</td>
                            <td className="p-2">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleOptRequest(channel)}
                                  disabled={isRequestingRemoval || channel.status === 'removal_requested'}
                                  className="bg-[#711CE9] hover:bg-[#5e17c2] text-white text-xs px-3 py-1 h-auto"
                                >
                                  {isRequestingRemoval ? <Loader2 className="h-3 w-3 animate-spin" /> : "Opt Request"}
                                </Button>
                                {/* <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button> */}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {channelsPagination && channelsPagination.totalPages > 1 && (
                    <PaginationControls
                      pagination={channelsPagination}
                      onPageChange={setChannelsPage}
                    />
                  )}
                </CardContent>
              </Card>
            ) : (
              <p className="text-center text-muted-foreground py-10">No active channels yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <RequestDetailsModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

const PaginationControls = ({ pagination, onPageChange }) => {
  const { currentPage, totalPages } = pagination
  return (
    <div className="flex items-center justify-end mt-4 gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  )
}