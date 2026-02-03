"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactContent } from "@/lib/content";

interface ContactFormProps {
  content: ContactContent;
}

export function ContactFormClient({ content }: ContactFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    childName: "",
    phone: "",
    email: "",
    enquiryType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 3;
  const progress = ((step - 1) / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.fullName.trim() !== "" && formData.childName.trim() !== "";
      case 2:
        return formData.phone.trim() !== "" && formData.email.trim() !== "";
      case 3:
        return formData.enquiryType !== "";
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-12 sm:py-16 md:py-24 bg-[#02B1C5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-lg mx-auto bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {content.successHeading}
            </h3>
            <p className="text-gray-600">
              {content.successMessage}{" "}
              <a href={`tel:${content.phoneNumber.replace(/\s/g, "")}`} className="text-[#02B1C5] font-medium transition-colors duration-300 hover:text-[#019AAD]">
                {content.phoneNumber}
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-[#02B1C5]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            {content.sectionTitle}
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg px-2">
            {content.sectionSubtitle}
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-lg mx-auto bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12">
          {/* Progress Bar */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-2">
              <span>{Math.round(progress)}% Complete</span>
              <span>
                {step} of {totalSteps}
              </span>
            </div>
            <div className="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#02B1C5] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Name Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="fullName">
                    Your Full Name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="childName">
                    Your Child&apos;s Full Name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="childName"
                    type="text"
                    value={formData.childName}
                    onChange={(e) => handleInputChange("childName", e.target.value)}
                    placeholder="Enter your child's full name"
                    className="mt-2"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="phone">
                    Your Preferred Phone Number<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">
                    Your Preferred Email<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email address"
                    className="mt-2"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 3: Enquiry Type */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="enquiryType">
                    How can we help you?<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.enquiryType}
                    onValueChange={(value) => handleInputChange("enquiryType", value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {content.enquiryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 sm:mt-8 gap-3">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="transition-all duration-300 hover:border-[#02B1C5] hover:text-[#02B1C5]"
                >
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-[#02B1C5] hover:bg-[#019AAD] transition-all duration-300 hover:shadow-lg hover:shadow-[#02B1C5]/25 hover:-translate-y-0.5 active:translate-y-0 rounded-[10px]"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!isStepValid() || isSubmitting}
                  className="bg-[#02B1C5] hover:bg-[#019AAD] transition-all duration-300 hover:shadow-lg hover:shadow-[#02B1C5]/25 hover:-translate-y-0.5 active:translate-y-0 rounded-[10px]"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
