"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Droplets, Wind, Sprout, Users, BarChart3, Shield, TrendingUp, Leaf } from "lucide-react"

interface ReportData {
  farmName: string
  reportPeriod: string
  crop: string
  fertilizer: string
  waterUse: string
  emissions: string
  yieldAmount: string
  landArea: string
  generatedDate: string
}

interface AdminStats {
  totalFarmers: number
  totalWaterUse: string
  totalEmissions: string
  totalLandArea: string
  averageYield: string
  topCrop: string
}

// Mock report data
const generateMockReport = (farmName: string, period: string): ReportData => {
  const crops = ["Wheat", "Corn", "Soybeans", "Rice"]
  const fertilizers = ["Urea", "NPK", "Organic Compost", "Phosphate"]

  const randomCrop = crops[Math.floor(Math.random() * crops.length)]
  const randomFertilizer = fertilizers[Math.floor(Math.random() * fertilizers.length)]

  return {
    farmName,
    reportPeriod: period,
    crop: randomCrop,
    fertilizer: randomFertilizer,
    waterUse: "250,000 liters",
    emissions: "8,500 kg CO₂",
    yieldAmount: "12.5 tons",
    landArea: "25 hectares",
    generatedDate: new Date().toLocaleDateString(),
  }
}

// Mock admin statistics
const mockAdminStats: AdminStats = {
  totalFarmers: 1247,
  totalWaterUse: "312.5M liters",
  totalEmissions: "10.6M kg CO₂",
  totalLandArea: "31,175 hectares",
  averageYield: "8.7 tons/hectare",
  topCrop: "Corn",
}

export function MRVReports() {
  const [viewMode, setViewMode] = useState<"farmer" | "admin">("farmer")
  const [formData, setFormData] = useState({
    farmName: "",
    period: "",
    startDate: "",
    endDate: "",
  })
  const [generatedReport, setGeneratedReport] = useState<ReportData | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.farmName || !formData.period) return

    setIsGenerating(true)

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const report = generateMockReport(formData.farmName, formData.period)
    setGeneratedReport(report)
    setIsGenerating(false)
  }

  const handleDownloadReport = () => {
    // Simulate PDF download
    const element = document.createElement("a")
    const file = new Blob([`MRV Report - ${generatedReport?.farmName} - ${generatedReport?.reportPeriod}`], {
      type: "text/plain",
    })
    element.href = URL.createObjectURL(file)
    element.download = `MRV-Report-${generatedReport?.farmName}-${generatedReport?.reportPeriod}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const resetForm = () => {
    setGeneratedReport(null)
    setFormData({ farmName: "", period: "", startDate: "", endDate: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">MRV Reports</h2>
          <p className="text-muted-foreground">
            Generate comprehensive Measurement, Reporting, and Verification reports
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "farmer" ? "default" : "outline"}
            onClick={() => setViewMode("farmer")}
            size="sm"
          >
            Farmer View
          </Button>
          <Button variant={viewMode === "admin" ? "default" : "outline"} onClick={() => setViewMode("admin")} size="sm">
            Admin Dashboard
          </Button>
        </div>
      </div>

      {viewMode === "farmer" ? (
        <>
          {!generatedReport ? (
            /* Report Generation Form */
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Generate MRV Report
                </CardTitle>
                <CardDescription>Create a comprehensive sustainability report for your farm operations</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerateReport} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="farmName">Farm Name</Label>
                      <Select
                        value={formData.farmName}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, farmName: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your farm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Green Valley Farm">Green Valley Farm</SelectItem>
                          <SelectItem value="Sunrise Agriculture">Sunrise Agriculture</SelectItem>
                          <SelectItem value="Prairie Fields Farm">Prairie Fields Farm</SelectItem>
                          <SelectItem value="Golden Harvest Farm">Golden Harvest Farm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="period">Reporting Period</Label>
                      <Select
                        value={formData.period}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, period: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Q2 2024">Q2 2024 (Apr-Jun)</SelectItem>
                          <SelectItem value="Q1 2024">Q1 2024 (Jan-Mar)</SelectItem>
                          <SelectItem value="2023 Annual">2023 Annual Report</SelectItem>
                          <SelectItem value="Spring 2024">Spring 2024 Season</SelectItem>
                          <SelectItem value="Summer 2024">Summer 2024 Season</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="startDate">Start Date (Optional)</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="endDate">End Date (Optional)</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Generating Report...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4" />
                        Generate MRV Report
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            /* Generated Report Display */
            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-6 w-6 text-primary" />
                        MRV Sustainability Report
                      </CardTitle>
                      <CardDescription>Verified and certified environmental impact assessment</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button onClick={handleDownloadReport} variant="outline" className="gap-2 bg-transparent">
                        <Download className="h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button onClick={resetForm} variant="outline">
                        New Report
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Report Header */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-background rounded-lg">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Farm Name</Label>
                      <p className="text-lg font-semibold">{generatedReport.farmName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Reporting Period</Label>
                      <p className="text-lg font-semibold">{generatedReport.reportPeriod}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Generated Date</Label>
                      <p className="text-lg font-semibold">{generatedReport.generatedDate}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Sprout className="h-5 w-5 text-primary" />
                          Primary Crop
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-primary">{generatedReport.crop}</div>
                        <p className="text-sm text-muted-foreground">Main cultivation</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Leaf className="h-5 w-5 text-primary" />
                          Fertilizer Used
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-primary">{generatedReport.fertilizer}</div>
                        <p className="text-sm text-muted-foreground">Primary nutrient source</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Droplets className="h-5 w-5 text-primary" />
                          Water Usage
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-primary">{generatedReport.waterUse}</div>
                        <p className="text-sm text-muted-foreground">Total consumption</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Wind className="h-5 w-5 text-primary" />
                          CO₂ Emissions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-primary">{generatedReport.emissions}</div>
                        <p className="text-sm text-muted-foreground">Carbon footprint</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Additional Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-primary" />
                          Production Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Yield:</span>
                          <span className="font-semibold">{generatedReport.yieldAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Land Area:</span>
                          <span className="font-semibold">{generatedReport.landArea}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Yield per Hectare:</span>
                          <span className="font-semibold">0.5 tons/ha</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary" />
                          Sustainability Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Water Efficiency:</span>
                          <Badge variant="secondary">Good</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Carbon Intensity:</span>
                          <Badge variant="secondary">Moderate</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Soil Health:</span>
                          <Badge variant="default">Excellent</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Verification Status */}
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <Shield className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-semibold">Verification Status</h4>
                          <p className="text-sm text-muted-foreground">
                            This report has been verified and certified according to international MRV standards. All
                            data points are cryptographically secured and immutable.
                          </p>
                        </div>
                        <Badge variant="default" className="ml-auto">
                          Verified
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      ) : (
        /* Admin Dashboard View */
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                Platform Overview
              </CardTitle>
              <CardDescription>Aggregated sustainability metrics across all registered farms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Total Registered Farmers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">
                      {mockAdminStats.totalFarmers.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Active farming operations</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-primary" />
                      Total Water Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{mockAdminStats.totalWaterUse}</div>
                    <p className="text-sm text-muted-foreground">Across all farms</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Wind className="h-5 w-5 text-primary" />
                      Total CO₂ Emissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{mockAdminStats.totalEmissions}</div>
                    <p className="text-sm text-muted-foreground">Platform carbon footprint</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Sprout className="h-5 w-5 text-primary" />
                      Total Land Area
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{mockAdminStats.totalLandArea}</div>
                    <p className="text-sm text-muted-foreground">Under management</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Average Yield
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{mockAdminStats.averageYield}</div>
                    <p className="text-sm text-muted-foreground">Platform average</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      Most Popular Crop
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">{mockAdminStats.topCrop}</div>
                    <p className="text-sm text-muted-foreground">35% of all farms</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Platform Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Platform Insights
              </CardTitle>
              <CardDescription>Key trends and sustainability improvements across the network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Environmental Impact Trends</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Water efficiency improvement</span>
                      <Badge variant="default">+12%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Carbon footprint reduction</span>
                      <Badge variant="default">-8%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Organic farming adoption</span>
                      <Badge variant="default">+25%</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Platform Growth</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">New farmer registrations</span>
                      <Badge variant="secondary">+156 this month</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Reports generated</span>
                      <Badge variant="secondary">2,847 total</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Data verification rate</span>
                      <Badge variant="secondary">99.7%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
