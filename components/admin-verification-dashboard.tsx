"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  Eye,
  UserCheck,
  UserX,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface FarmerApplication {
  id: string
  name: string
  farmLocation: string
  farmSize: string
  cropType: string
  applicationDate: string
  status: "pending" | "verified" | "rejected"
  documents: string[]
  phoneNumber: string
  email: string
}

const mockApplications: FarmerApplication[] = [
  {
    id: "F001",
    name: "राज कुमार शर्मा",
    farmLocation: "पंजाब, भारत",
    farmSize: "5 एकड़",
    cropType: "गेहूं, चावल",
    applicationDate: "2024-01-15",
    status: "pending",
    documents: ["आधार कार्ड", "भूमि दस्तावेज", "बैंक पासबुक"],
    phoneNumber: "+91 98765 43210",
    email: "raj.sharma@email.com",
  },
  {
    id: "F002",
    name: "Priya Patel",
    farmLocation: "Gujarat, India",
    farmSize: "3 Acres",
    cropType: "Cotton, Groundnut",
    applicationDate: "2024-01-14",
    status: "verified",
    documents: ["Aadhar Card", "Land Documents", "Bank Passbook"],
    phoneNumber: "+91 87654 32109",
    email: "priya.patel@email.com",
  },
  {
    id: "F003",
    name: "अमित सिंह",
    farmLocation: "उत्तर प्रदेश, भारत",
    farmSize: "8 एकड़",
    cropType: "गन्ना, आलू",
    applicationDate: "2024-01-13",
    status: "rejected",
    documents: ["आधार कार्ड", "भूमि दस्तावेज"],
    phoneNumber: "+91 76543 21098",
    email: "amit.singh@email.com",
  },
  {
    id: "F004",
    name: "Sunita Devi",
    farmLocation: "Bihar, India",
    farmSize: "2 Acres",
    cropType: "Rice, Vegetables",
    applicationDate: "2024-01-12",
    status: "pending",
    documents: ["Aadhar Card", "Land Documents", "Bank Passbook"],
    phoneNumber: "+91 65432 10987",
    email: "sunita.devi@email.com",
  },
]

export function AdminVerificationDashboard() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("pending")
  const [applications, setApplications] = useState(mockApplications)

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.farmLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = selectedTab === "all" || app.status === selectedTab
    return matchesSearch && matchesTab
  })

  const handleVerifyFarmer = (id: string) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: "verified" as const } : app)))
  }

  const handleRejectApplication = (id: string) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: "rejected" as const } : app)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            {t("button.pending")}
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="default" className="gap-1 bg-green-500">
            <CheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const pendingCount = applications.filter((app) => app.status === "pending").length
  const verifiedCount = applications.filter((app) => app.status === "verified").length
  const rejectedCount = applications.filter((app) => app.status === "rejected").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">{t("admin.title")}</h2>
          <p className="text-muted-foreground">{t("admin.subtitle")}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            {t("common.refresh")}
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            {t("admin.exportData")}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-card hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.pendingVerifications")}</CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{pendingCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
          </CardContent>
        </Card>

        <Card className="gradient-card hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.verifiedFarmers")}</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{verifiedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully verified</p>
          </CardContent>
        </Card>

        <Card className="gradient-card hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.rejectedApplications")}</CardTitle>
            <div className="p-2 bg-red-100 rounded-lg">
              <UserX className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Applications rejected</p>
          </CardContent>
        </Card>

        <Card className="gradient-card hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.systemAlerts")}</CardTitle>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">3</div>
            <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`${t("common.search")} farmers...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              {t("common.filter")}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
              <TabsTrigger value="verified">Verified ({verifiedCount})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
              <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Farmer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Farm Size</TableHead>
                  <TableHead>Crop Type</TableHead>
                  <TableHead>{t("common.status")}</TableHead>
                  <TableHead>{t("common.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>{application.name}</TableCell>
                    <TableCell>{application.farmLocation}</TableCell>
                    <TableCell>{application.farmSize}</TableCell>
                    <TableCell>{application.cropType}</TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                          <Eye className="h-3 w-3" />
                          {t("admin.viewDetails")}
                        </Button>
                        {application.status === "pending" && (
                          <>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="default" size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
                                  <CheckCircle className="h-3 w-3" />
                                  {t("button.approve")}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>{t("admin.verifyFarmer")}</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to verify {application.name}? This action will grant them
                                    access to the platform.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleVerifyFarmer(application.id)}>
                                    Verify Farmer
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm" className="gap-1">
                                  <XCircle className="h-3 w-3" />
                                  {t("button.reject")}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>{t("admin.rejectApplication")}</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to reject {application.name}'s application? This action cannot
                                    be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleRejectApplication(application.id)}>
                                    Reject Application
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
