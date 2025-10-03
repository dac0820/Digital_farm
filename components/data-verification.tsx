"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Lock, Search, Calendar, CheckCircle, AlertCircle, Database, Hash, Clock } from "lucide-react"

interface VerificationRecord {
  id: string
  type: "activity" | "report" | "registration" | "advisory"
  farmName: string
  description: string
  timestamp: string
  blockHash: string
  verificationStatus: "verified" | "pending" | "failed"
  dataIntegrity: "intact" | "compromised"
}

// Mock verification records
const mockVerificationRecords: VerificationRecord[] = [
  {
    id: "VR001",
    type: "activity",
    farmName: "Green Valley Farm",
    description: "Corn planting activity logged",
    timestamp: "2024-06-15T10:30:00Z",
    blockHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
    verificationStatus: "verified",
    dataIntegrity: "intact",
  },
  {
    id: "VR002",
    type: "report",
    farmName: "Sunrise Agriculture",
    description: "Q2 2024 MRV report generated",
    timestamp: "2024-06-14T15:45:00Z",
    blockHash: "0x9876543210fedcba0987654321abcdef",
    verificationStatus: "verified",
    dataIntegrity: "intact",
  },
  {
    id: "VR003",
    type: "registration",
    farmName: "Prairie Fields Farm",
    description: "Farmer profile registration",
    timestamp: "2024-06-13T09:20:00Z",
    blockHash: "0xabcdef1234567890fedcba0987654321",
    verificationStatus: "verified",
    dataIntegrity: "intact",
  },
  {
    id: "VR004",
    type: "activity",
    farmName: "Golden Harvest Farm",
    description: "Fertilizer application recorded",
    timestamp: "2024-06-12T14:15:00Z",
    blockHash: "0x567890abcdef1234567890abcdef1234",
    verificationStatus: "verified",
    dataIntegrity: "intact",
  },
  {
    id: "VR005",
    type: "advisory",
    farmName: "Green Valley Farm",
    description: "AI crop recommendation generated",
    timestamp: "2024-06-11T11:00:00Z",
    blockHash: "0xfedcba0987654321fedcba0987654321",
    verificationStatus: "verified",
    dataIntegrity: "intact",
  },
  {
    id: "VR006",
    type: "activity",
    farmName: "Sunrise Agriculture",
    description: "Harvest data entry",
    timestamp: "2024-06-10T16:30:00Z",
    blockHash: "0x1234567890abcdef1234567890abcdef",
    verificationStatus: "pending",
    dataIntegrity: "intact",
  },
]

const getRecordTypeIcon = (type: string) => {
  switch (type) {
    case "activity":
      return <Database className="h-4 w-4" />
    case "report":
      return <Shield className="h-4 w-4" />
    case "registration":
      return <CheckCircle className="h-4 w-4" />
    case "advisory":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Database className="h-4 w-4" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "verified":
      return (
        <Badge variant="default" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          Verified
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="secondary" className="gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="h-3 w-3" />
          Failed
        </Badge>
      )
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export function DataVerification() {
  const [records, setRecords] = useState<VerificationRecord[]>(mockVerificationRecords)
  const [filters, setFilters] = useState({
    type: "all",
    farmName: "",
    status: "all",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRecords = records.filter((record) => {
    const matchesType = filters.type === "all" || record.type === filters.type
    const matchesFarm = !filters.farmName || record.farmName.toLowerCase().includes(filters.farmName.toLowerCase())
    const matchesStatus = filters.status === "all" || record.verificationStatus === filters.status
    const matchesSearch =
      !searchTerm ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.blockHash.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesType && matchesFarm && matchesStatus && matchesSearch
  })

  const verificationStats = {
    total: records.length,
    verified: records.filter((r) => r.verificationStatus === "verified").length,
    pending: records.filter((r) => r.verificationStatus === "pending").length,
    integrityRate: Math.round((records.filter((r) => r.dataIntegrity === "intact").length / records.length) * 100),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Data Verification</h2>
          <p className="text-muted-foreground">
            Immutable record keeping and blockchain-like verification for complete transparency
          </p>
        </div>
        <Badge variant="secondary" className="gap-2">
          <Shield className="h-4 w-4" />
          {verificationStats.integrityRate}% Data Integrity
        </Badge>
      </div>

      {/* Verification Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="h-5 w-5 text-primary" />
              Total Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{verificationStats.total}</div>
            <p className="text-sm text-muted-foreground">Immutable entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-5 w-5 text-primary" />
              Verified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{verificationStats.verified}</div>
            <p className="text-sm text-muted-foreground">Cryptographically secured</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{verificationStats.pending}</div>
            <p className="text-sm text-muted-foreground">Awaiting verification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-primary" />
              Integrity Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{verificationStats.integrityRate}%</div>
            <p className="text-sm text-muted-foreground">Data authenticity</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Search & Filter Records
          </CardTitle>
          <CardDescription>Find specific verification records using filters and search</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search Records</Label>
              <Input
                id="search"
                placeholder="Search by ID, description, or hash..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="type">Record Type</Label>
              <Select value={filters.type} onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="activity">Activity Logs</SelectItem>
                  <SelectItem value="report">MRV Reports</SelectItem>
                  <SelectItem value="registration">Registrations</SelectItem>
                  <SelectItem value="advisory">AI Advisory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="farmName">Farm Name</Label>
              <Input
                id="farmName"
                placeholder="Filter by farm..."
                value={filters.farmName}
                onChange={(e) => setFilters((prev) => ({ ...prev, farmName: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="status">Verification Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Records Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Immutable Verification Records
          </CardTitle>
          <CardDescription>
            Complete audit trail of all platform activities with cryptographic verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Record ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Farm</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Block Hash</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No verification records found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                          {record.id}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getRecordTypeIcon(record.type)}
                          <span className="capitalize">{record.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{record.farmName}</TableCell>
                      <TableCell className="max-w-xs truncate">{record.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(record.timestamp).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4 text-muted-foreground" />
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {record.blockHash.substring(0, 16)}...
                          </code>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(record.verificationStatus)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold">Blockchain-Like Immutability</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  All records are cryptographically secured and timestamped. Once verified, data cannot be modified or
                  deleted, ensuring complete transparency and trust in the MRV process. Each record contains a unique
                  hash that links to previous records, creating an immutable chain of agricultural data.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-primary" />
            Technical Implementation
          </CardTitle>
          <CardDescription>Understanding the verification and immutability mechanisms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Data Integrity Features</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Cryptographic hashing for each record</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Immutable timestamp verification</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Chain-linked record validation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Multi-node consensus verification</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Transparency Benefits</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Complete audit trail for regulators</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Tamper-proof sustainability claims</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Real-time verification status</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Decentralized trust network</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
