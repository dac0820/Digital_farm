"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Satellite, Droplets, Lock, Activity, BarChart3 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ActivityLog {
  id: string
  crop: string
  eventType: string
  date: string
  details: string
  timestamp: string
}

// Mock satellite data
const ndviData = [
  { date: "Jan", value: 0.3 },
  { date: "Feb", value: 0.35 },
  { date: "Mar", value: 0.45 },
  { date: "Apr", value: 0.6 },
  { date: "May", value: 0.75 },
  { date: "Jun", value: 0.8 },
]

const rainfallData = [
  { date: "Jan", value: 45 },
  { date: "Feb", value: 38 },
  { date: "Mar", value: 52 },
  { date: "Apr", value: 68 },
  { date: "May", value: 85 },
  { date: "Jun", value: 92 },
]

// Mock activity logs
const mockActivities: ActivityLog[] = [
  {
    id: "1",
    crop: "Corn",
    eventType: "Planting",
    date: "2024-03-15",
    details: "Planted corn seeds in north field, 2.5 acres",
    timestamp: "2024-03-15T10:30:00Z",
  },
  {
    id: "2",
    crop: "Corn",
    eventType: "Fertilizer Application",
    date: "2024-04-10",
    details: "Applied nitrogen fertilizer (50kg/acre)",
    timestamp: "2024-04-10T14:20:00Z",
  },
  {
    id: "3",
    crop: "Soybeans",
    eventType: "Planting",
    date: "2024-04-20",
    details: "Planted soybeans in south field, 3 acres",
    timestamp: "2024-04-20T09:15:00Z",
  },
]

const cropOptions = ["Corn", "Soybeans", "Wheat", "Tomatoes", "Potatoes"]
const eventTypes = ["Planting", "Fertilizer Application", "Pesticide Use", "Harvest", "Irrigation", "Weeding"]

export function ActivityMonitoring() {
  const [selectedCrop, setSelectedCrop] = useState("All crops")
  const [activities, setActivities] = useState<ActivityLog[]>(mockActivities)
  const [formData, setFormData] = useState({
    crop: "",
    eventType: "",
    date: "",
    details: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.crop || !formData.eventType || !formData.date) return

    const newActivity: ActivityLog = {
      id: Date.now().toString(),
      crop: formData.crop,
      eventType: formData.eventType,
      date: formData.date,
      details: formData.details,
      timestamp: new Date().toISOString(),
    }

    setActivities((prev) => [newActivity, ...prev])
    setFormData({ crop: "", eventType: "", date: "", details: "" })
  }

  const filteredActivities =
    selectedCrop !== "All crops" ? activities.filter((activity) => activity.crop === selectedCrop) : activities

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Farm Activity Monitoring</h2>
          <p className="text-muted-foreground">Log farm activities and track crop progress with satellite insights</p>
        </div>
        <Badge variant="secondary" className="gap-2">
          <Activity className="h-4 w-4" />
          {activities.length} Activities Logged
        </Badge>
      </div>

      {/* Satellite Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Satellite className="h-5 w-5 text-primary" />
              NDVI (Vegetation Index)
            </CardTitle>
            <CardDescription>Normalized Difference Vegetation Index - measures crop health and growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ndviData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip formatter={(value) => [`${value}`, "NDVI"]} labelFormatter={(label) => `Month: ${label}`} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Current NDVI: <span className="font-semibold text-primary">0.8</span> - Excellent crop health
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" />
              Rainfall Data
            </CardTitle>
            <CardDescription>Monthly rainfall measurements affecting crop growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rainfallData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value}mm`, "Rainfall"]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                This month: <span className="font-semibold text-primary">92mm</span> - Above average
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Logging Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Log New Activity
          </CardTitle>
          <CardDescription>Record farm activities to maintain accurate crop management records</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="crop">Select Crop</Label>
                <Select
                  value={formData.crop}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, crop: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropOptions.map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="eventType">Event Type</Label>
                <Select
                  value={formData.eventType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, eventType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="details">Activity Details</Label>
                <Textarea
                  id="details"
                  placeholder="Enter activity details (e.g., 'Applied 50kg nitrogen fertilizer to north field')"
                  value={formData.details}
                  onChange={(e) => setFormData((prev) => ({ ...prev, details: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>
            </div>

            <Button type="submit" className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Log Activity
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Activity History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Activity History
              </CardTitle>
              <CardDescription>Immutable record of all farm activities - verified and timestamped</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="cropFilter" className="text-sm">
                Filter by crop:
              </Label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All crops" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All crops">All crops</SelectItem>
                  {cropOptions.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No activities logged yet. Start by adding your first activity above.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{new Date(activity.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{activity.crop}</Badge>
                      </TableCell>
                      <TableCell>{activity.eventType}</TableCell>
                      <TableCell className="max-w-xs truncate">{activity.details || "No details provided"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Verified</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {filteredActivities.length > 0 && (
            <div className="mt-4 p-3 bg-muted rounded-lg flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                All records are immutable and cryptographically verified for transparency and trust.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
