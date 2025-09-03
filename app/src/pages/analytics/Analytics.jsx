import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Play, DollarSign, Users, Globe, Music, IndianRupee } from 'lucide-react';

// Sample data for charts
const streamsData = [
  { month: 'Jan', streams: 50000 },
  { month: 'Feb', streams: 220000 },
  { month: 'Mar', streams: 120000 },
  { month: 'Apr', streams: 230000 },
  { month: 'May', streams: 290000 },
  { month: 'Jun', streams: 400000 },
  
];

const revenueData = [
  { month: 'Jan', revenue: 15000 },
  { month: 'Feb', revenue: 18000 },
  { month: 'Mar', revenue: 24000 },
  { month: 'Apr', revenue: 28000 },
  { month: 'May', revenue: 35000 },
  { month: 'Jun', revenue: 40000 }
];

const topTracks = [
  { id: 1, name: 'Midnight Dreams', streams: '456K', revenue: '₹45,600', change: '+16%', changeType: 'positive' },
  { id: 2, name: 'Ocean Waves', streams: '321K', revenue: '₹32,100', change: '+8%', changeType: 'positive' },
  { id: 3, name: 'City Lights', streams: '298K', revenue: '₹29,800', change: '+22%', changeType: 'positive' },
  { id: 4, name: 'Silent Thunder', streams: '267K', revenue: '₹26,700', change: '-3%', changeType: 'negative' },
  { id: 5, name: 'Golden Hour', streams: '234K', revenue: '₹23,400', change: '+12%', changeType: 'positive' }
];

const platformData = [
  { name: 'Spotify', value: 45, color: 'hsl(142, 76%, 36%)' },
  { name: 'Apple Music', value: 25, color: 'hsl(0, 84%, 60%)' },
  { name: 'YouTube Music', value: 20, color: 'hsl(0, 84%, 60%)' },
  { name: 'Amazon Music', value: 10, color: 'hsl(43, 74%, 66%)' }
];

// const audienceData = [
//   { age: '18-24', listeners: 15000, percentage: 25 },
//   { age: '25-34', listeners: 18000, percentage: 30 },
//   { age: '35-44', listeners: 12000, percentage: 20 },
//   { age: '45-54', listeners: 9000, percentage: 15 },
//   { age: '55+', listeners: 6000, percentage: 10 }
// ];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your music performance and audience</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">Total Streams</CardTitle>
            <Play className="h-4 w-4 text-[#711CE9]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M</div>
            <div className="flex items-center text-xs text-muted-foreground ">
             <h1> <span className='text-green-500'>+12%</span> vs last period</h1>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-[#711CE9]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,43,750</div>
            <div className="flex items-center text-xs text-muted-foreground ">
             <h1> <span className='text-green-500 '>+8.2%</span> vs last period</h1>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">Active Listeners</CardTitle>
            <Users className="h-4 w-4 text-[#711CE9]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <div className="flex items-center text-xs text-muted-foreground ">
              <h1> <span className='text-red-500'>-2.4% </span>vs last period</h1>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">Countries Reached</CardTitle>
            <Globe className="h-4 w-4 text-[#711CE9]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>+0 vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 ">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tracks">Top Tracks</TabsTrigger>
          {/* <TabsTrigger value="audience">Audience</TabsTrigger> */}
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Streams Over Time</CardTitle>
                <CardDescription>Monthly streaming performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={streamsData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground " />
                    <Area
                      type="monotone"
                      dataKey="streams"
                      stroke="#711CE9"
                      fill="#711CE9"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#711CE9"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Top Tracks Tab */}
        <TabsContent value="tracks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Tracks</CardTitle>
              <CardDescription>Your most successful releases this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTracks.map((track, index) => (
                  <div key={track.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">{track.name}</h3>
                        <p className="text-sm text-muted-foreground">{track.streams} streams</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{track.revenue}</p>
                      <p className={`text-sm ${track.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                        {track.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audience Tab */}
        {/* <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
                <CardDescription>Listener demographics by age group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {audienceData.map((group) => (
                    <div key={group.age} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-primary rounded"></div>
                        <span className="font-medium">{group.age}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${group.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {group.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Top listening regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { country: 'India', percentage: 35, listeners: '15.8K' },
                    { country: 'United States', percentage: 28, listeners: '12.7K' },
                    { country: 'United Kingdom', percentage: 15, listeners: '6.8K' },
                    { country: 'Canada', percentage: 12, listeners: '5.4K' },
                    { country: 'Australia', percentage: 10, listeners: '4.5K' }
                  ].map((region) => (
                    <div key={region.country} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-primary rounded"></div>
                        <span className="font-medium">{region.country}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">{region.listeners}</span>
                        <span className="text-sm font-medium w-12 text-right">{region.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent> */}

        {/* Platforms Tab */}
        <TabsContent value="platforms" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Stream distribution across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>Detailed breakdown by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platformData.map((platform) => (
                    <div key={platform.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: platform.color }}
                        ></div>
                        <span className="font-medium">{platform.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${platform.value}%`,
                              backgroundColor: platform.color 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12 text-right">
                          {platform.value}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}