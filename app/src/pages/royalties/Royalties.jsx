import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Download, DollarSign, TrendingUp, BarChart3, Calendar, Music, FileDown } from 'lucide-react';

// Sample data for charts
const monthlyTrendsData = [
  { month: 'Jan', streaming: 2800, mechanical: 900, sync: 600 },
  { month: 'Feb', streaming: 3200, mechanical: 1100, sync: 700 },
  { month: 'Mar', streaming: 3800, mechanical: 1200, sync: 850 },
  { month: 'Apr', streaming: 4200, mechanical: 1350, sync: 950 },
  { month: 'May', streaming: 4800, mechanical: 1500, sync: 1100 },
  { month: 'Jun', streaming: 5200, mechanical: 1650, sync: 1250 }
];

const royaltyCompositionData = [
  { month: 'Jan', streaming: 2800, mechanical: 900, sync: 600, total: 4300 },
  { month: 'Feb', streaming: 3200, mechanical: 1100, sync: 700, total: 5000 },
  { month: 'Mar', streaming: 3800, mechanical: 1200, sync: 850, total: 5850 },
  { month: 'Apr', streaming: 4200, mechanical: 1350, sync: 950, total: 6500 },
  { month: 'May', streaming: 4800, mechanical: 1500, sync: 1100, total: 7400 },
  { month: 'Jun', streaming: 5200, mechanical: 1650, sync: 1250, total: 8100 }
];

const platformRevenueData = [
  { name: 'Spotify', value: 35, color: '#1DB954', amount: '₹21,000', share: '35% share' },
  { name: 'Apple Music', value: 25, color: '#FA2D48', amount: '₹15,000', share: '25% share' },
  { name: 'YouTube Music', value: 20, color: '#FF0000', amount: '₹12,000', share: '20% share' },
  { name: 'JioSaavn', value: 12, color: '#02AAB0', amount: '₹7,200', share: '12% share' },
  { name: 'Others', value: 8, color: '#8B5CF6', amount: '₹4,800', share: '8% share' }
];

const topEarningTracks = [
  { id: 1, name: 'Midnight Dreams', artist: 'John Doe', earnings: '₹12,500', streams: '250,000' },
  { id: 2, name: 'Summer Vibes', artist: 'Jane Smith', earnings: '₹8,900', streams: '180,000' },
  { id: 3, name: 'Urban Beats', artist: 'MC Flow', earnings: '₹6,700', streams: '135,000' },
  { id: 4, name: 'Classical Symphony', artist: 'Orchestra', earnings: '₹5,400', streams: '110,000' }
];

const paymentHistory = [
  { date: '1/5/2024', period: 'December 2023', regular: '₹4,200', bonus: '₹800', total: '₹5,000' },
  { date: '2/5/2024', period: 'January 2024', regular: '₹4,600', bonus: '₹1,200', total: '₹5,800' },
  { date: '3/5/2024', period: 'February 2024', regular: '₹5,200', bonus: '₹1,400', total: '₹6,600' },
  { date: '4/5/2024', period: 'March 2024', regular: '₹5,800', bonus: '₹1,600', total: '₹7,400' }
];

const quickDownloads = [
  'Last Month Statement',
  'Q1 2024 Report',
  'Tax Document (2023)',
  'Platform Performance'
];

export default function Royalties() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Royalties</h1>
          <p className="text-muted-foreground">Track your earnings and royalty payments</p>
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
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Payout
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,24,500</div>
            <div className="flex items-center text-sm text-green-500">
              <span>+16% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹6,200</div>
            <div className="flex items-center text-sm text-green-500">
              <span>+24% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">Bonus Royalties</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹18,400</div>
            <div className="flex items-center text-sm text-green-500">
              <span>+36% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹7,400</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Due Apr 5</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Royalty Trends</CardTitle>
              <CardDescription>Track your royalty earnings over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Line
                    type="monotone"
                    dataKey="streaming"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mechanical"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sync"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Royalty Composition</CardTitle>
                <CardDescription>Monthly breakdown by type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={royaltyCompositionData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Bar dataKey="streaming" stackId="a" fill="#8B5CF6" />
                    <Bar dataKey="mechanical" stackId="a" fill="#10B981" />
                    <Bar dataKey="sync" stackId="a" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-muted-foreground/10 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Monthly</p>
                      <p className="text-xl font-bold">₹4,267</p>
                    </div>
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  
                  <div className="flex items-center justify-between bg-muted-foreground/10 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Best Month</p>
                      <p className="text-xl font-bold">₹6,200 (Jun)</p>
                    </div>
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                  </div>
                  
                  <div className="flex items-center justify-between bg-muted-foreground/10 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Growth Rate</p>
                      <p className="text-xl font-bold text-green-500">+121%</p>
                    </div>
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Platform</CardTitle>
                <CardDescription>Distribution across streaming platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformRevenueData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {platformRevenueData.map((entry, index) => (
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
                <CardDescription>Detailed revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platformRevenueData.map((platform) => (
                    <div key={platform.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: platform.color }}
                        ></div>
                        <div>
                          <p className="font-medium">{platform.name}</p>
                          <p className="text-sm text-muted-foreground">{platform.share}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{platform.amount}</p>
                        <p className="text-sm text-muted-foreground">This month</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Earning Tracks</CardTitle>
              <CardDescription>Your highest revenue generating tracks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topEarningTracks.map((track, index) => (
                  <div key={track.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        <Music className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{track.name}</h3>
                        <p className="text-sm text-muted-foreground">{track.artist}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{track.earnings}</p>
                      <p className="text-sm text-muted-foreground">{track.streams} streams</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Track all your royalty payments</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="regular">Regular Only</SelectItem>
                  <SelectItem value="bonus">Bonus Only</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Period</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Regular</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Bonus</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment) => (
                      <tr key={payment.date} className="border-b hover:bg-accent/50">
                        <td className="py-3 px-4 font-medium">{payment.date}</td>
                        <td className="py-3 px-4">{payment.period}</td>
                        <td className="py-3 px-4">{payment.regular}</td>
                        <td className="py-3 px-4">{payment.bonus}</td>
                        <td className="py-3 px-4 text-right font-semibold">{payment.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Custom Report</CardTitle>
                <CardDescription>Create detailed royalty reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div >
                  <label className="text-sm font-medium mb-2 block">Report Type</label>
                  <Select >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="earnings">Earnings Summary</SelectItem>
                      <SelectItem value="platform">Platform Breakdown</SelectItem>
                      <SelectItem value="tracks">Track Performance</SelectItem>
                      <SelectItem value="payments">Payment History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Date Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      placeholder="mm/dd/yyyy"
                      className="px-3 py-2 border rounded-md bg-background"
                    />
                    <input
                      type="date"
                      placeholder="mm/dd/yyyy"
                      className="px-3 py-2 border rounded-md bg-background"
                    />
                  </div>
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Downloads</CardTitle>
                <CardDescription>Ready-made reports and documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickDownloads.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3">
                        <FileDown className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{item}</span>
                      </div>
                      <Download className="w-4 h-4 text-muted-foreground" />
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