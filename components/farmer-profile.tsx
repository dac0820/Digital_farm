"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, MapPin, Sprout, Calendar, Mail, Edit, Leaf, BarChart3 } from "lucide-react"

// Mock farmer data - in a real app this would come from a database
const mockFarmerData = {
  name: "John Smith",
  email: "john.smith@email.com",
  farmName: "Green Valley Farm",
  location: "Iowa, United States",
  landArea: "150",
  landUnit: "acres",
  crops: ["Corn", "Soybeans", "Wheat"],
  joinDate: "March 2024",
  totalActivities: 24,
  lastActivity: "2 days ago",
}

export function FarmerProfile() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">{mockFarmerData.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4" />
                  {mockFarmerData.email}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Member since {mockFarmerData.joinDate}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Farm Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-primary" />
              Farm Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Farm Name</Label>
              <p className="text-lg font-semibold">{mockFarmerData.farmName}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <p className="text-lg">{mockFarmerData.location}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground">Total Land Area</Label>
              <p className="text-lg font-semibold">
                {mockFarmerData.landArea} {mockFarmerData.landUnit}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              Crops
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mockFarmerData.crops.map((crop) => (
                <Badge key={crop} variant="secondary" className="px-3 py-1">
                  {crop}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Growing {mockFarmerData.crops.length} different crop varieties
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Activity Summary
          </CardTitle>
          <CardDescription>Overview of your farm management activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-bold text-primary">{mockFarmerData.totalActivities}</div>
              <p className="text-sm text-muted-foreground">Total Activities Logged</p>
            </div>

            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-bold text-primary">{mockFarmerData.crops.length}</div>
              <p className="text-sm text-muted-foreground">Active Crop Types</p>
            </div>

            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-bold text-primary">{mockFarmerData.lastActivity}</div>
              <p className="text-sm text-muted-foreground">Last Activity</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you can perform from your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
              <Sprout className="h-6 w-6 text-primary" />
              <span>Log Activity</span>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span>View Reports</span>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
              <MapPin className="h-6 w-6 text-primary" />
              <span>Update Location</span>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
              <Leaf className="h-6 w-6 text-primary" />
              <span>Manage Crops</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <label className={`text-sm font-medium ${className}`}>{children}</label>
}
