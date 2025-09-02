import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { Bell, Moon, Music, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { useTheme } from '@/contextapi/TheamContext'

const AppHeader = () => {
    const {theme , toggleTheme } = useTheme()
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger  />
                
                <div className="hidden md:flex items-center space-x-4">
                  <div className="h-6 w-px bg-border" />
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-purple-600 rounded-md flex items-center justify-center">
                      <Music className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xl font-bold ">Maheshwari Visuals</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme }
                >
                  {theme ==='dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span className="ml-2 hidden sm:inline">{theme ==='dark' ? 'Light' : 'Dark'}</span>
                </Button>
                
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">MV</span>
                </div>
              </div>
            </div>
          </header>
  )
}

export default AppHeader
