"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Users,
  Clock,
  LogOut,
  Moon,
  Sun,
  User,
  CheckCircle,
  XCircle,
  Send,
  Calendar,
  BookOpen,
  AlertCircle,
  MessageSquare,
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/components/auth-provider"

// Mock data
const teacherData = {
  name: "Mr. Aditya Maheshwari",
  employeeId: "T101",
  department: "Computer Science",
  email: "T101.aditya@technonjr.org",
  subjects: ["Data Structures", "Database Systems", "Web Development"],
}

const classes = [
  {
    id: "cs301",
    name: "CS-301 (Data Structures)",
    subject: "Data Structures",
    students: 45,
    schedule: "Mon, Wed, Fri - 9:00 AM",
    room: "CS-101",
  },
  {
    id: "cs302",
    name: "CS-302 (Database Systems)",
    subject: "Database Systems",
    students: 38,
    schedule: "Tue, Thu - 11:00 AM",
    room: "CS-102",
  },
  {
    id: "cs303",
    name: "CS-303 (Web Development)",
    subject: "Web Development",
    students: 42,
    schedule: "Mon, Wed - 2:00 PM",
    room: "CS-103",
  },
]

const studentsData = [
  { id: "24ETCCS163", name: "SHUBHANSH", attendance: 87, status: "present", lastSeen: "Today 9:05 AM" },
  { id: "24ETCCS058", name: "HINESH", attendance: 92, status: "present", lastSeen: "Today 9:03 AM" },
  { id: "24ETCCS133", name: "PAYAL", attendance: 78, status: "absent", lastSeen: "Yesterday 2:15 PM" },
  { id: "24ETCCS175", name: "TUSHAR", attendance: 95, status: "present", lastSeen: "Today 9:01 AM" },
  { id: "24ETCCS166", name: "SUHANI", attendance: 82, status: "present", lastSeen: "Today 9:07 AM" },
]

const attendanceStats = [
  { name: "Present", value: 35, color: "#10b981" },
  { name: "Absent", value: 8, color: "#ef4444" },
  { name: "Late", value: 2, color: "#f59e0b" },
]

const weeklyAttendance = [
  { day: "Mon", present: 42, absent: 3 },
  { day: "Tue", present: 35, absent: 3 },
  { day: "Wed", present: 40, absent: 5 },
  { day: "Thu", present: 36, absent: 2 },
  { day: "Fri", present: 38, absent: 7 },
]

export default function TeacherPortal() {
  const { theme, setTheme } = useTheme()
  const { logout } = useAuth()
  const [selectedClass, setSelectedClass] = useState(classes[0])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [notificationForm, setNotificationForm] = useState({
    recipient: "all",
    subject: "",
    message: "",
    selectedStudents: [] as string[],
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleNotificationSubmit = () => {
    // Handle notification sending logic
    console.log("Sending notification:", notificationForm)
    setNotificationForm({
      recipient: "all",
      subject: "",
      message: "",
      selectedStudents: [],
    })
  }

  const handleStudentSelection = (studentId: string, checked: boolean) => {
    setNotificationForm((prev) => ({
      ...prev,
      selectedStudents: checked
        ? [...prev.selectedStudents, studentId]
        : prev.selectedStudents.filter((id) => id !== studentId),
    }))
  }

  return (
    <div className="min-h-screen bg-background transition-all duration-500">
      <header className="bg-card shadow-sm border-b border-border animate-in slide-in-from-top duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-left duration-500">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center animate-pulse">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Teacher Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {teacherData.name}</p>
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
          {/* Profile & Classes */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                </div>
                <CardTitle className="text-lg">{teacherData.name}</CardTitle>
                <CardDescription>{teacherData.employeeId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Department:</span>
                  <span className="text-sm font-medium">{teacherData.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                  <span className="text-sm font-medium">{teacherData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Classes:</span>
                  <Badge variant="secondary">{classes.length}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Class Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">My Classes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {classes.map((classItem) => (
                  <div
                    key={classItem.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedClass.id === classItem.id
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedClass(classItem)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm">{classItem.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {classItem.students}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{classItem.schedule}</p>
                    <p className="text-xs text-gray-500">{classItem.room}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedClass.students}</div>
                      <p className="text-xs text-muted-foreground">in {selectedClass.name}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Present Today</CardTitle>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">35</div>
                      <p className="text-xs text-muted-foreground">77.8% attendance</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
                      <XCircle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">10</div>
                      <p className="text-xs text-muted-foreground">22.2% absent</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Attendance Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Today's Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={attendanceStats}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {attendanceStats.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex justify-center space-x-4 mt-4">
                        {attendanceStats.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-sm">
                              {item.name}: {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Weekly Attendance Trend */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={weeklyAttendance}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="present" fill="#10b981" />
                          <Bar dataKey="absent" fill="#ef4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Students Tab */}
              <TabsContent value="students" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Students in {selectedClass.name}</CardTitle>
                    <CardDescription>Manage and view student information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {studentsData.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                              <h3 className="font-medium">{student.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{student.id}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">{student.attendance}% Attendance</p>
                              <p className="text-xs text-gray-500">{student.lastSeen}</p>
                            </div>
                            <Badge
                              variant={student.status === "present" ? "default" : "destructive"}
                              className={student.status === "present" ? "bg-green-500" : ""}
                            >
                              {student.status === "present" ? (
                                <CheckCircle className="w-3 h-3 mr-1" />
                              ) : (
                                <XCircle className="w-3 h-3 mr-1" />
                              )}
                              {student.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Attendance Tab */}
              <TabsContent value="attendance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Summary - {selectedClass.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">87.5%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Average Attendance</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">35</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Present Today</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">10</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Absent Today</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">5</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Below 80%</div>
                      </div>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={weeklyAttendance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="present" fill="#10b981" name="Present" />
                        <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      My Teaching Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="space-y-2">
                          <h3 className="font-medium text-center p-2 bg-gray-100 dark:bg-gray-800 rounded">{day}</h3>
                          <div className="space-y-1">
                            {day === "Monday" && (
                              <>
                                <div className="p-2 text-xs bg-green-50 dark:bg-green-900/20 rounded border-l-2 border-green-500">
                                  <div className="font-medium text-green-900 dark:text-green-100">Data Structures</div>
                                  <div className="text-green-700 dark:text-green-200">9:00 AM - CS-101</div>
                                </div>
                                <div className="p-2 text-xs bg-blue-50 dark:bg-blue-900/20 rounded border-l-2 border-blue-500">
                                  <div className="font-medium text-blue-900 dark:text-blue-100">Web Development</div>
                                  <div className="text-blue-700 dark:text-blue-200">2:00 PM - CS-103</div>
                                </div>
                              </>
                            )}
                            {day === "Tuesday" && (
                              <div className="p-2 text-xs bg-purple-50 dark:bg-purple-900/20 rounded border-l-2 border-purple-500">
                                <div className="font-medium text-purple-900 dark:text-purple-100">Database Systems</div>
                                <div className="text-purple-700 dark:text-purple-200">11:00 AM - CS-102</div>
                              </div>
                            )}
                            {day === "Wednesday" && (
                              <>
                                <div className="p-2 text-xs bg-green-50 dark:bg-green-900/20 rounded border-l-2 border-green-500">
                                  <div className="font-medium text-green-900 dark:text-green-100">Data Structures</div>
                                  <div className="text-green-700 dark:text-green-200">9:00 AM - CS-101</div>
                                </div>
                                <div className="p-2 text-xs bg-blue-50 dark:bg-blue-900/20 rounded border-l-2 border-blue-500">
                                  <div className="font-medium text-blue-900 dark:text-blue-100">Web Development</div>
                                  <div className="text-blue-700 dark:text-blue-200">2:00 PM - CS-103</div>
                                </div>
                              </>
                            )}
                            {day === "Thursday" && (
                              <div className="p-2 text-xs bg-purple-50 dark:bg-purple-900/20 rounded border-l-2 border-purple-500">
                                <div className="font-medium text-purple-900 dark:text-purple-100">Database Systems</div>
                                <div className="text-purple-700 dark:text-purple-200">11:00 AM - CS-102</div>
                              </div>
                            )}
                            {day === "Friday" && (
                              <div className="p-2 text-xs bg-green-50 dark:bg-green-900/20 rounded border-l-2 border-green-500">
                                <div className="font-medium text-green-900 dark:text-green-100">Data Structures</div>
                                <div className="text-green-700 dark:text-green-200">9:00 AM - CS-101</div>
                              </div>
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
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Send Notifications
                    </CardTitle>
                    <CardDescription>Send notifications to students in your classes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Send To</Label>
                      <Select
                        value={notificationForm.recipient}
                        onValueChange={(value) => setNotificationForm((prev) => ({ ...prev, recipient: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Students in Class</SelectItem>
                          <SelectItem value="selected">Selected Students</SelectItem>
                          <SelectItem value="absent">Absent Students Only</SelectItem>
                          <SelectItem value="low-attendance">Low Attendance Students</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {notificationForm.recipient === "selected" && (
                      <div className="space-y-2">
                        <Label>Select Students</Label>
                        <div className="max-h-40 overflow-y-auto space-y-2 border rounded-md p-3">
                          {studentsData.map((student) => (
                            <div key={student.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={student.id}
                                checked={notificationForm.selectedStudents.includes(student.id)}
                                onCheckedChange={(checked) => handleStudentSelection(student.id, checked as boolean)}
                              />
                              <Label htmlFor={student.id} className="text-sm">
                                {student.name} ({student.id})
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Enter notification subject"
                        value={notificationForm.subject}
                        onChange={(e) => setNotificationForm((prev) => ({ ...prev, subject: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Enter your message"
                        rows={4}
                        value={notificationForm.message}
                        onChange={(e) => setNotificationForm((prev) => ({ ...prev, message: e.target.value }))}
                      />
                    </div>

                    <Button onClick={handleNotificationSubmit} className="w-full bg-green-600 hover:bg-green-700">
                      <Send className="w-4 h-4 mr-2" />
                      Send Notification
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Remind about upcoming assignment
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Share class materials
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Calendar className="w-4 h-4 mr-2" />
                      Announce schedule change
                    </Button>
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
