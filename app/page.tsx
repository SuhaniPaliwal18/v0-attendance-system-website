"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, Shield, Building2, Moon, Sun, Clock, CheckCircle, Sparkles } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const portals = [
    {
      id: "student",
      title: "Student Portal",
      description: "View attendance, schedules, and notifications",
      icon: GraduationCap,
      color: "bg-blue-500 hover:bg-blue-600",
      features: ["Attendance Tracking", "Subject-wise Reports", "Daily Schedule", "Notifications"],
    },
    {
      id: "teacher",
      title: "Teacher Portal",
      description: "Manage classes, view attendance, send notifications",
      icon: Users,
      color: "bg-green-500 hover:bg-green-600",
      features: ["Class Management", "Attendance Summary", "Student Notifications", "Schedule View"],
    },
    {
      id: "admin",
      title: "Administrator Portal",
      description: "Live attendance feed, user management, notifications",
      icon: Shield,
      color: "bg-purple-500 hover:bg-purple-600",
      features: ["Live Attendance Feed", "User Management", "System Notifications", "Reports"],
    },
    {
      id: "government",
      title: "Government Portal",
      description: "State-wise school data and attendance analytics",
      icon: Building2,
      color: "bg-orange-500 hover:bg-orange-600",
      features: ["State-wise Data", "District Analytics", "School Reports", "Attendance Insights"],
    },
  ]

  const handlePortalClick = (portalId: string) => {
    window.location.href = `/login?portal=${portalId}`
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 transition-all duration-500">
      <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 animate-in slide-in-from-top duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 animate-in fade-in slide-in-from-left duration-500">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center animate-pulse">
              <CheckCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AttendanceAI</h1>
              <p className="text-sm text-muted-foreground">Face Recognition System</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-right duration-500">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: "60s" }} />
              <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:scale-110 transition-transform duration-200"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 animate-in spin-in-180 duration-300" />
              ) : (
                <Moon className="w-4 h-4 animate-in spin-in-180 duration-300" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-in fade-in slide-in-from-bottom duration-700">
            Smart Attendance
            <span className="text-primary animate-pulse"> Management</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            Revolutionary face recognition technology for seamless attendance tracking across educational institutions
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            {["Real-time Recognition", "Automated Tracking", "Multi-Portal Access", "Live Analytics"].map(
              (feature, index) => (
                <Badge
                  key={feature}
                  variant="secondary"
                  className="px-4 py-2 text-sm hover:scale-105 transition-transform duration-200 animate-in fade-in delay-300"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  {feature}
                </Badge>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-500">
          <h3 className="text-3xl font-bold text-foreground mb-4">Choose Your Portal</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your role to access the appropriate dashboard with tailored features and functionality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {portals.map((portal, index) => {
            const IconComponent = portal.icon
            return (
              <Card
                key={portal.id}
                className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 cursor-pointer border-2 hover:border-primary/50 animate-in fade-in slide-in-from-bottom duration-500"
                onClick={() => handlePortalClick(portal.id)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${portal.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {portal.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">{portal.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {portal.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 group-hover:animate-pulse" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 ${portal.color} text-white transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePortalClick(portal.id)
                    }}
                  >
                    Access Portal
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Advanced technology meets educational excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Real-time Recognition</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Instant face recognition with high accuracy for seamless check-ins
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Multi-Role Access</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Dedicated portals for students, teachers, administrators, and officials
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Live Analytics</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time attendance tracking with comprehensive reporting
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4 animate-in fade-in duration-500">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AttendanceAI</span>
          </div>
          <p className="text-muted-foreground mb-4">Smart India Hackathon 2024 - Face Recognition Attendance System</p>
          <p className="text-sm text-muted-foreground">© 2024 AttendanceAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
