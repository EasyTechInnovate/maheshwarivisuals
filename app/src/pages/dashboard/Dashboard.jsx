import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, DollarSign, IndianRupee, Megaphone, Music, Play, Upload, Video } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import {earningsData ,streamsData ,videoTutorials ,recentReleases ,quickActions ,performanceMetrics} from './Dashboard.config'
import React, { useEffect } from 'react';
import { getServerHealth } from '@/services/api.services';

const Dashboard = () => {
  
  return (
    <div className=''>
      <main className="p-2 md:p-2 space-y-8">
        <div className='flex flex-wrap space-y-6 justify-between items-center'>

        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your music.
          </p>
        </div>

        {/* Upload Release Button */}
        <a href="/user/upload-release">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white" >
          <Upload className="w-4 h-4 mr-2" />
          Upload Release
        </Button>
        </a>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Releases", value: "24", subtext: "2 this month", icon: Music , color:'text-blue-500'},
            { label: "Total Streams", value: "2.4M", subtext: "↑ this month", icon: Play  , color:'text-green-500'},
            { label: "Total Earnings", value: "₹2,43,750", subtext: "↑ this month", icon: IndianRupee , color:'text-purple-500'},
            { label: "Active Campaigns", value: "5", subtext: "2 campaigns", icon: Megaphone  ,color:'text-orange-500'}
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </h3>
                  <Icon className={`h-4 w-4 ${stat.color} `} />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Earnings Chart */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold  flex flex-nowrap items-center gap-1"><span>{<IndianRupee className='text-purple-400' size='20'/>}</span> Monthly Earnings</h3>
              <p className="text-sm text-muted-foreground">Your earnings over the last 6 months</p>
            </div>
            <div className="h-64 ">
              <ResponsiveContainer width="100%" height="100%" >
                <LineChart data={earningsData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    tickFormatter={(value) => `${value/1000}k`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#8B5CF6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Streams Chart */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold  flex flex-nowrap items-center gap-1"><span><Play className='text-green-500' size='20'/></span> Monthly Streams</h3>
              <p className="text-sm text-muted-foreground">Your streaming performance over the last 6 months</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={streamsData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    tickFormatter={(value) => `${value/1000}k`}
                  />
                  <Bar 
                    dataKey="streams" 
                    fill="#8B5CF6" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Video Tutorials Section */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Video Tutorials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoTutorials.map((tutorial, index) => (
              <div key={index} className="space-y-3 border rounded-lg p-4">
                <div className="aspect-21/6 rounded-lg bg-muted flex items-center justify-center">
                  <Video className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium">{tutorial.title}</h4>
                  <div className='flex justify-between items-center'>
                    <p className="text-sm text-muted-foreground">{tutorial.duration}</p>
                    <p className="text-sm text-muted-foreground">{tutorial.views}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section with Recent Releases, Quick Actions, and Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Releases */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold ">Recent Releases</h3>
              <p className="text-sm text-muted-foreground">Your latest releases and their performance</p>
            </div>
            <div className="space-y-4">
              {recentReleases.map((release, index) => (
                <div key={index} className="flex items-center space-x-3 bg-muted/50 rounded-lg p-4">
                  <div className="w-12 h-12 rounded-lg bg-[#2A2051] flex items-center justify-center">
                    <Music className="w-6 h-6 text-[#711CE9] " />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium  truncate">{release.title}</h4>
                <p className="text-sm text-muted-foreground ">{release.streams}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                      <p className="text-sm text-muted-foreground">{release.artist}</p>
                      <span className={`px-3 py-1 font-semibold rounded-full text-xs text-white ${release.status === 'Live' ? 'bg-[#711CE9] ' : 'bg-gray-700 '}`}>
                        {release.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold ">Quick Actions</h3>
              <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
            </div>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div key={index} className="flex items-center gap-5 p-3 rounded-lg  hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 text-[#711CE9]`} />
                      <div>
                        <h4 className="font-medium ">{action.title}</h4>
                        <p className="text-sm text-muted-foreground">{action.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight size='20' className="text-muted-foreground"></ArrowRight>
                  </div>
                );
              })}
            </div>
          </div>

          {/* This Month's Performance */}
        </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold ">This Month's Performance</h3>
              <p className="text-sm text-muted-foreground">Track your growth and engagement metrics</p>
            </div>
            <div className="space-y-6 grid grid-cols-1 lg:grid-cols-3 space-x-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-2 ">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium ">{metric.title}</h4>
                    <span className="text-sm font-semibold ">{metric.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`bg-[#711CE9] h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${metric.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{metric.current}{metric.target && ` / ${metric.target}`}</span>
                  </div>
                  {/* {metric.title === "Fan Engagement" && (
                    <p className="text-xs text-muted-foreground">Excellent performance</p>
                  )} */}
                </div>
              ))}
            </div>
          </div>
      </main>
    </div>
  );
};

export default Dashboard;