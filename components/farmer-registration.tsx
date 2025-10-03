"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, User, Sprout, ArrowRight, ArrowLeft } from "lucide-react"

interface FarmerData {
  // Step 1: Basic Details
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string

  // Step 2: Farm Details
  farmName: string
  farmNumber: string // Added farm/survey number field
  location: string
  landArea: string
  landUnit: string
  crops: string[]
}

const cropOptions = [
  "Wheat",
  "Rice",
  "Corn",
  "Soybeans",
  "Cotton",
  "Tomatoes",
  "Potatoes",
  "Onions",
  "Carrots",
  "Lettuce",
  "Spinach",
  "Beans",
]

export function FarmerRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isRegistered, setIsRegistered] = useState(false)
  const [formData, setFormData] = useState<FarmerData>({
    firstName: "", // Split name into first and last name
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    farmName: "",
    farmNumber: "", // Added farm number field
    location: "",
    landArea: "",
    landUnit: "acres",
    crops: [],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.farmName.trim()) newErrors.farmName = "Farm name is required"
    if (!formData.farmNumber.trim()) newErrors.farmNumber = "Farm number is required" // Added farm number validation
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.landArea.trim()) newErrors.landArea = "Land area is required"
    if (formData.crops.length === 0) newErrors.crops = "Select at least one crop"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    setCurrentStep(1)
    setErrors({})
  }

  const handleSubmit = () => {
    if (validateStep2()) {
      // Simulate registration
      setIsRegistered(true)
    }
  }

  const handleCropToggle = (crop: string) => {
    setFormData((prev) => ({
      ...prev,
      crops: prev.crops.includes(crop) ? prev.crops.filter((c) => c !== crop) : [...prev.crops, crop],
    }))
  }

  if (isRegistered) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Registration Successful!</CardTitle>
            <CardDescription>
              Welcome to FarmMRV, {formData.firstName} {formData.lastName}! Your farmer profile has been created.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsRegistered(false)} className="w-full">
              View Your Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl">Farmer Registration</CardTitle>
            <Badge variant="outline">Step {currentStep} of 2</Badge>
          </div>
          <Progress value={currentStep * 50} className="w-full" />
          <CardDescription>
            {currentStep === 1 ? "Enter your basic information to get started" : "Tell us about your farm and crops"}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Step 1: Basic Details */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Enter your first name"
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                  {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Enter your last name"
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                  {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email address"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Create a password (min. 6 characters)"
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm your password"
                  className={errors.confirmPassword ? "border-destructive" : ""}
                />
                {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            <Button onClick={handleNext} className="w-full gap-2">
              Next Step
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Farm Details */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-primary" />
              Farm Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="farmName">Farm Name</Label>
                <Input
                  id="farmName"
                  value={formData.farmName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, farmName: e.target.value }))}
                  placeholder="Enter your farm name"
                  className={errors.farmName ? "border-destructive" : ""}
                />
                {errors.farmName && <p className="text-sm text-destructive mt-1">{errors.farmName}</p>}
              </div>

              <div>
                <Label htmlFor="farmNumber">Farm Number / Survey Number</Label>
                <Input
                  id="farmNumber"
                  value={formData.farmNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, farmNumber: e.target.value }))}
                  placeholder="Enter your farm/survey number"
                  className={errors.farmNumber ? "border-destructive" : ""}
                />
                {errors.farmNumber && <p className="text-sm text-destructive mt-1">{errors.farmNumber}</p>}
              </div>

              <div>
                <Label htmlFor="location">Farm Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="City, State/Province, Country"
                  className={errors.location ? "border-destructive" : ""}
                />
                {errors.location && <p className="text-sm text-destructive mt-1">{errors.location}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="landArea">Total Land Area</Label>
                  <Input
                    id="landArea"
                    type="number"
                    value={formData.landArea}
                    onChange={(e) => setFormData((prev) => ({ ...prev, landArea: e.target.value }))}
                    placeholder="Enter area"
                    className={errors.landArea ? "border-destructive" : ""}
                  />
                  {errors.landArea && <p className="text-sm text-destructive mt-1">{errors.landArea}</p>}
                </div>
                <div>
                  <Label htmlFor="landUnit">Unit</Label>
                  <Select
                    value={formData.landUnit}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, landUnit: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="hectares">Hectares</SelectItem>
                      <SelectItem value="square-meters">Square Meters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Crops You Plan to Grow</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {cropOptions.map((crop) => (
                    <Button
                      key={crop}
                      variant={formData.crops.includes(crop) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCropToggle(crop)}
                      className="justify-start"
                    >
                      {crop}
                    </Button>
                  ))}
                </div>
                {errors.crops && <p className="text-sm text-destructive mt-1">{errors.crops}</p>}
                {formData.crops.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">Selected: {formData.crops.join(", ")}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={handleBack} className="flex-1 gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleSubmit} className="flex-1">
                Complete Registration
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
