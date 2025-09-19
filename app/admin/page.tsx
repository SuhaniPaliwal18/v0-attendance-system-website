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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Shield,
  Clock,
  LogOut,
  Moon,
  Sun,
  User,
  CheckCircle,
  Send,
  UserPlus,
  Users,
  GraduationCap,
  AlertCircle,
  MessageSquare,
  Eye,
  RefreshCw,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/components/auth-provider"

// Mock data for live attendance feed
const liveAttendanceData = [
  {
    id: 1,
    studentName: "Shubhansh",
    studentId: "24ETCCS163",
    class: "CS-301",
    checkInTime: "09:03:45",
    status: "present",
    confidence: 98.5,
    timestamp: new Date(),
  },
  {
    id: 2,
    studentName: "Tushar",
    studentId: "24ETCCS175",
    class: "CS-301",
    checkInTime: "09:05:12",
    status: "present",
    confidence: 97.2,
    timestamp: new Date(Date.now() - 2 * 60000),
  },
  {
    id: 3,
    studentName: "Hinesh",
    studentId: "24ETCCS058",
    class: "CS-302",
    checkInTime: "11:02:30",
    status: "present",
    confidence: 96.8,
    timestamp: new Date(Date.now() - 5 * 60000),
  },
]

const studentsData = [
  {
    id: "24ETCCS163",
    name: "Shubhansh",
    class: "CS-301",
    attendance: 87,
    email: "john@student.edu",
    phone: "+1234567890",
  },
  {
    id: "24ETCCS166",
    name: "Suhani",
    class: "CS-301",
    attendance: 92,
    email: "jane@student.edu",
    phone: "+1234567891",
  },
  {
    id: "24ETCCS058",
    name: "Hinesh",
    class: "CS-302",
    attendance: 78,
    email: "mike@student.edu",
    phone: "+1234567892",
  },
  {
    id: "24ETCCS133",
    name: "Payal",
    class: "CS-303",
    attendance: 95,
    email: "emily@student.edu",
    phone: "+1234567893",
  },
]

const teachersData = [
  {
    id: "T2021001",
    name: "Mr. Aditya Maheshwari",
    department: "Computer Science",
    classes: 3,
    students: 125,
    email: "sarah@university.edu",
  },
  {
    id: "T2021002",
    name: "Dr. Rimpy Bishnoi",
    department: "Computer Science",
    classes: 2,
    students: 85,
    email: "michael@university.edu",
  },
  {
    id: "T2021003",
    name: "Dr. Rekha Tiwari",
    department: "Mathematics",
    classes: 4,
    students: 160,
    email: "lisa@university.edu",
  },
]

const pendingRequests = [
  {
    id: 1,
    name: "Dhruv",
    email: "alex@student.edu",
    role: "student",
    requestDate: "2024-01-15",
    reason: "New admission",
  },
  {
    id: 2,
    name: "Dr. Naresh Mali",
    email: "robert@university.edu",
    role: "teacher",
    requestDate: "2024-01-14",
    reason: "New faculty member",
  },
  {
    id: 3,
    name: "Shreya",
    email: "maria@student.edu",
    role: "student",
    requestDate: "2024-01-13",
    reason: "Transfer student",
  },
]

export default function AdminPortal() {
  const { theme, setTheme } = useTheme()
  const { logout } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedClass, setSelectedClass] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [liveAttendance, setLiveAttendance] = useState(liveAttendanceData)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student",
    id: "",
    class: "",
    department: "",
  })
  const [notificationForm, setNotificationForm] = useState({
    recipient: "students",
    subject: "",
    message: "",
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate new attendance entries with enhanced animation
      if (Math.random() > 0.95) {
        const newEntry = {
          id: Date.now(),
          studentName: "Payal",
          studentId: `CS202${Math.floor(Math.random() * 1000)}`,
          class: "CS-301",
          checkInTime: new Date().toLocaleTimeString(),
          status: "present",
          confidence: 95 + Math.random() * 5,
          timestamp: new Date(),
        }
        setLiveAttendance((prev) => [newEntry, ...prev.slice(0, 9)])
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const handleApproveRequest = (requestId: number) => {
    console.log("Approving request:", requestId)
    // Handle approval logic
  }

  const handleAddUser = () => {
    console.log("Adding new user:", newUser)
    setIsAddUserOpen(false)
    setNewUser({
      name: "",
      email: "",
      role: "student",
      id: "",
      class: "",
      department: "",
    })
  }

  const handleSendNotification = () => {
    console.log("Sending notification:", notificationForm)
    setNotificationForm({
      recipient: "students",
      subject: "",
      message: "",
    })
  }

  const filteredStudents = studentsData.filter(
    (student) =>
      (selectedClass === "all" || student.class === selectedClass) &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-background transition-all duration-500">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border animate-in slide-in-from-top duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-left duration-500">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center animate-pulse">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Administrator Portal</h1>
              <p className="text-sm text-muted-foreground">System Management Dashboard</p>
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
        <Tabs defaultValue="live-feed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="live-feed">Live Feed</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Live Attendance Feed */}
          <TabsContent value="live-feed" className="space-y-6">
            <div className="flex justify-between items-center animate-in fade-in slide-in-from-bottom duration-500">
              <h2 className="text-2xl font-bold">Live Attendance Feed</h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:scale-105 transition-transform duration-200 bg-transparent"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="CS-301">CS-301</SelectItem>
                    <SelectItem value="CS-302">CS-302</SelectItem>
                    <SelectItem value="CS-303">CS-303</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                {
                  title: "Total Check-ins Today",
                  value: "247",
                  change: "+12% from yesterday",
                  icon: CheckCircle,
                  color: "text-green-600",
                },
                {
                  title: "Active Classes",
                  value: "8",
                  change: "Currently in session",
                  icon: Users,
                  color: "text-blue-600",
                },
                {
                  title: "Average Confidence",
                  value: "97.2%",
                  change: "Face recognition accuracy",
                  icon: Eye,
                  color: "text-purple-600",
                },
                { title: "Alerts", value: "3", change: "Require attention", icon: AlertCircle, color: "text-red-600" },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="animate-in fade-in slide-in-from-bottom duration-700">
              <CardHeader>
                <CardTitle>Real-time Check-ins</CardTitle>
                <CardDescription>Live feed of student attendance updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {liveAttendance.map((entry, index) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] animate-in fade-in slide-in-from-right duration-500"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center animate-pulse">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{entry.studentName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {entry.studentId} • {entry.class}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{entry.checkInTime}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {entry.confidence.toFixed(1)}% confidence
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {Math.floor((Date.now() - entry.timestamp.getTime()) / 60000)}m ago
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Management */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex justify-between items-center animate-in fade-in slide-in-from-bottom duration-500">
              <h2 className="text-2xl font-bold">Student Management</h2>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="hover:scale-105 transition-transform duration-200">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent className="animate-in fade-in zoom-in-95 duration-300">
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>Enter student details to add them to the system</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter full name"
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input
                        id="studentId"
                        value={newUser.id}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, id: e.target.value }))}
                        placeholder="Enter student ID"
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter email address"
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="class">Class</Label>
                      <Select
                        value={newUser.class}
                        onValueChange={(value) => setNewUser((prev) => ({ ...prev, class: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CS-301">CS-301</SelectItem>
                          <SelectItem value="CS-302">CS-302</SelectItem>
                          <SelectItem value="CS-303">CS-303</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={handleAddUser}
                      className="w-full hover:scale-105 transition-transform duration-200"
                    >
                      Add Student
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex space-x-4 mb-6 animate-in fade-in slide-in-from-bottom duration-500 delay-200">
              <div className="flex-1">
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full transition-all duration-200 focus:scale-[1.02]"
                />
              </div>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="CS-301">CS-301</SelectItem>
                  <SelectItem value="CS-302">CS-302</SelectItem>
                  <SelectItem value="CS-303">CS-303</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="animate-in fade-in slide-in-from-bottom duration-700">
              <CardHeader>
                <CardTitle>Students ({filteredStudents.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student, index) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] animate-in fade-in slide-in-from-left duration-500"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {student.id} • {student.class}
                          </p>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{student.attendance}% Attendance</p>
                          <Badge
                            variant={student.attendance >= 80 ? "default" : "destructive"}
                            className={student.attendance >= 80 ? "bg-green-500" : ""}
                          >
                            {student.attendance >= 80 ? "Good" : "Low"}
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:scale-105 transition-transform duration-200 bg-transparent"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teachers Management */}
          <TabsContent value="teachers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Teacher Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Teacher
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Teacher</DialogTitle>
                    <DialogDescription>Enter teacher details to add them to the system</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacherName">Full Name</Label>
                      <Input id="teacherName" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teacherId">Teacher ID</Label>
                      <Input id="teacherId" placeholder="Enter teacher ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teacherEmail">Email</Label>
                      <Input id="teacherEmail" type="email" placeholder="Enter email address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Add Teacher</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Teachers ({teachersData.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teachersData.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">{teacher.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {teacher.id} • {teacher.department}
                          </p>
                          <p className="text-xs text-gray-500">{teacher.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{teacher.classes} Classes</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{teacher.students} Students</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Schedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Requests */}
          <TabsContent value="requests" className="space-y-6">
            <h2 className="text-2xl font-bold">Pending Registration Requests</h2>

            <Card>
              <CardHeader>
                <CardTitle>Requests Awaiting Approval ({pendingRequests.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{request.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {request.email} • Requesting {request.role} access
                          </p>
                          <p className="text-xs text-gray-500">
                            Submitted: {request.requestDate} • Reason: {request.reason}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApproveRequest(request.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <h2 className="text-2xl font-bold animate-in fade-in slide-in-from-bottom duration-500">
              Send System Notifications
            </h2>

            <Card className="animate-in fade-in slide-in-from-bottom duration-500 delay-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Broadcast Notification
                </CardTitle>
                <CardDescription>Send notifications to students or teachers</CardDescription>
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
                      <SelectItem value="students">All Students</SelectItem>
                      <SelectItem value="teachers">All Teachers</SelectItem>
                      <SelectItem value="all">Everyone</SelectItem>
                      <SelectItem value="class-cs301">CS-301 Students</SelectItem>
                      <SelectItem value="class-cs302">CS-302 Students</SelectItem>
                      <SelectItem value="class-cs303">CS-303 Students</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notificationSubject">Subject</Label>
                  <Input
                    id="notificationSubject"
                    placeholder="Enter notification subject"
                    value={notificationForm.subject}
                    onChange={(e) => setNotificationForm((prev) => ({ ...prev, subject: e.target.value }))}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notificationMessage">Message</Label>
                  <Textarea
                    id="notificationMessage"
                    placeholder="Enter your message"
                    rows={4}
                    value={notificationForm.message}
                    onChange={(e) => setNotificationForm((prev) => ({ ...prev, message: e.target.value }))}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>

                <Button
                  onClick={handleSendNotification}
                  className="w-full bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-200"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Notification
                </Button>
              </CardContent>
            </Card>

            {/* Quick Notifications */}
            <Card className="animate-in fade-in slide-in-from-bottom duration-500 delay-300">
              <CardHeader>
                <CardTitle>Quick Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: AlertCircle, text: "System maintenance scheduled" },
                  { icon: Clock, text: "Attendance deadline reminder" },
                  { icon: Users, text: "New feature announcement" },
                ].map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start bg-transparent hover:scale-105 transition-all duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.text}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">System Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87</div>
                  <p className="text-xs text-muted-foreground">+2 new this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">86.4%</div>
                  <p className="text-xs text-muted-foreground">+2.1% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                  <Shield className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.9%</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
