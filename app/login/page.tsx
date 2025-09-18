"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Eye, EyeOff, Users, GraduationCap, Shield, Building2, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const portalType = searchParams.get("portal") || "student"

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: portalType,
    studentId: "",
    teacherId: "",
    adminId: "",
    officialId: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const portalConfig = {
    student: {
      title: "Student Portal",
      icon: GraduationCap,
      color: "bg-blue-500",
      description: "Access your attendance records and notifications",
    },
    teacher: {
      title: "Teacher Portal",
      icon: Users,
      color: "bg-green-500",
      description: "Manage your classes and student attendance",
    },
    admin: {
      title: "Administrator Portal",
      icon: Shield,
      color: "bg-purple-500",
      description: "Monitor live attendance and manage users",
    },
    government: {
      title: "Government Portal",
      icon: Building2,
      color: "bg-orange-500",
      description: "View state-wise educational analytics",
    },
  }

  const currentPortal = portalConfig[portalType as keyof typeof portalConfig] || portalConfig.student
  const IconComponent = currentPortal.icon

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate authentication
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Redirect to appropriate portal
        window.location.href = `/${portalType}`
      } else {
        setError("Please fill in all required fields")
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div
              className={`w-16 h-16 ${currentPortal.color} rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{currentPortal.title}</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">{currentPortal.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Portal Type</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="government">Government Official</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ID Field based on role */}
              {formData.role === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    type="text"
                    placeholder="Enter your student ID"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange("studentId", e.target.value)}
                    required
                  />
                </div>
              )}

              {formData.role === "teacher" && (
                <div className="space-y-2">
                  <Label htmlFor="teacherId">Teacher ID</Label>
                  <Input
                    id="teacherId"
                    type="text"
                    placeholder="Enter your teacher ID"
                    value={formData.teacherId}
                    onChange={(e) => handleInputChange("teacherId", e.target.value)}
                    required
                  />
                </div>
              )}

              {formData.role === "admin" && (
                <div className="space-y-2">
                  <Label htmlFor="adminId">Administrator ID</Label>
                  <Input
                    id="adminId"
                    type="text"
                    placeholder="Enter your admin ID"
                    value={formData.adminId}
                    onChange={(e) => handleInputChange("adminId", e.target.value)}
                    required
                  />
                </div>
              )}

              {formData.role === "government" && (
                <div className="space-y-2">
                  <Label htmlFor="officialId">Official ID</Label>
                  <Input
                    id="officialId"
                    type="text"
                    placeholder="Enter your official ID"
                    value={formData.officialId}
                    onChange={(e) => handleInputChange("officialId", e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className={`w-full ${currentPortal.color} hover:opacity-90 text-white`}
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Request Access
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <CheckCircle className="w-4 h-4" />
            <span>Secured with face recognition technology</span>
          </div>
        </div>
      </div>
    </div>
  )
}
