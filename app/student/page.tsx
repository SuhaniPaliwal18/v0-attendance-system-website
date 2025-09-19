"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import {
  Bell,
  CalendarIcon,
  Clock,
  GraduationCap,
  LogOut,
  Moon,
  Sun,
  User,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/components/auth-provider"

// Mock data
const studentData = {
  name: "Bhavy Tamboli",
  rollNo: "24ETCCS301",
  class: "Computer Science - 2rd Year",
  email: "24etccs301.bhavy@technonjr.org",
  profileImage: "/Users/shubhanshnagda/Downloads/WhatsApp Image 2025-09-19 at 10.35.58.jpeg",
}

const attendanceData = [
  { month: "Jan", percentage: 85 },
  { month: "Feb", percentage: 92 },
  { month: "Mar", percentage: 78 },
  { month: "Apr", percentage: 88 },
  { month: "May", percentage: 95 },
  { month: "Jun", percentage: 82 },
]

const subjectAttendance = [
  { subject: "Data Structures", present: 28, total: 32, percentage: 87.5 },
  { subject: "Database Systems", present: 25, total: 30, percentage: 83.3 },
  { subject: "Web Development", present: 30, total: 32, percentage: 93.8 },
  { subject: "Machine Learning", present: 22, total: 28, percentage: 78.6 },
  { subject: "Software Engineering", present: 26, total: 30, percentage: 86.7 },
]

const todaySchedule = [
  { time: "09:00 AM", subject: "Data Structures", room: "CS-101", status: "present" },
  { time: "11:00 AM", subject: "Database Systems", room: "CS-102", status: "present" },
  { time: "02:00 PM", subject: "Web Development", room: "CS-103", status: "upcoming" },
  { time: "04:00 PM", subject: "Machine Learning", room: "CS-104", status: "upcoming" },
]

const notifications = [
  {
    id: 1,
    title: "Assignment Due Tomorrow",
    message: "Database Systems assignment submission deadline is tomorrow at 11:59 PM",
    time: "2 hours ago",
    type: "warning",
    from: "Prof. Smith",
  },
  {
    id: 2,
    title: "Class Cancelled",
    message: "Machine Learning class scheduled for 4 PM today has been cancelled",
    time: "4 hours ago",
    type: "info",
    from: "Prof. Johnson",
  },
  {
    id: 3,
    title: "Attendance Alert",
    message: "Your attendance in Machine Learning is below 80%. Please attend upcoming classes.",
    time: "1 day ago",
    type: "alert",
    from: "Administration",
  },
]

export default function StudentPortal() {
  const { theme, setTheme } = useTheme()
  const { logout } = useAuth()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [attendanceFilter, setAttendanceFilter] = useState("monthly")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "absent":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "upcoming":
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "info":
        return <Bell className="w-5 h-5 text-blue-500" />
      case "alert":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background transition-all duration-500">
      <header className="bg-card shadow-sm border-b border-border animate-in slide-in-from-top duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-left duration-500">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center animate-pulse">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Student Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {studentData.name}</p>
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
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-105 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                </div>
                <CardTitle className="text-lg">{studentData.name}</CardTitle>
                <CardDescription>{studentData.rollNo}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Class:</span>
                  <span className="text-sm font-medium">{studentData.class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                  <span className="text-sm font-medium">{studentData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Overall Attendance:</span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    86.8%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Classes Today</span>
                  <Badge variant="outline">4</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Present Today</span>
                  <Badge className="bg-green-500">2/2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Upcoming</span>
                  <Badge variant="secondary">2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notifications</span>
                  <Badge variant="destructive">{notifications.length}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="dashboard" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Today's Schedule */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-2" />
                        Today's Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {todaySchedule.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                          >
                            <div className="flex items-center space-x-3">
                              {getStatusIcon(item.status)}
                              <div>
                                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{item.subject}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-300">{item.room}</p>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.time}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Attendance Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Attendance Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {subjectAttendance.slice(0, 3).map((subject, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{subject.subject}</span>
                              <span className="font-medium">{subject.percentage.toFixed(1)}%</span>
                            </div>
                            <Progress value={subject.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Monthly Attendance Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Attendance Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={attendanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="percentage" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Attendance Tab */}
              <TabsContent value="attendance" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Attendance Records</h2>
                  <Select value={attendanceFilter} onValueChange={setAttendanceFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Subject-wise Attendance */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Subject-wise Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {subjectAttendance.map((subject, index) => (
                          <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium">{subject.subject}</h3>
                              <Badge
                                variant={subject.percentage >= 80 ? "default" : "destructive"}
                                className={subject.percentage >= 80 ? "bg-green-500" : ""}
                              >
                                {subject.percentage.toFixed(1)}%
                              </Badge>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                              <span>Present: {subject.present}</span>
                              <span>Total: {subject.total}</span>
                            </div>
                            <Progress value={subject.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Calendar View */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Calendar View</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="space-y-2">
                          <h3 className="font-medium text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">{day}</h3>
                          <div className="space-y-1">
                            {day !== "Saturday" && day !== "Sunday" && (
                              <>
                                <div className="p-2 text-xs bg-blue-50 dark:bg-blue-900/20 rounded border-l-2 border-blue-500">
                                  <div className="font-medium text-blue-900 dark:text-blue-100">Data Structures</div>
                                  <div className="text-blue-700 dark:text-blue-200">9:00 AM</div>
                                </div>
                                <div className="p-2 text-xs bg-green-50 dark:bg-green-900/20 rounded border-l-2 border-green-500">
                                  <div className="font-medium text-green-900 dark:text-green-100">Database Systems</div>
                                  <div className="text-green-700 dark:text-green-200">11:00 AM</div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      Recent Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-start space-x-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <h3 className="font-medium">{notification.title}</h3>
                                <span className="text-xs text-gray-500">{notification.time}</span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{notification.message}</p>
                              <p className="text-xs text-gray-500">From: {notification.from}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={subjectAttendance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="percentage" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
