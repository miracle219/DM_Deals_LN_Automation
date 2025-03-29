"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  role: z.enum([
    "B2B_FOUNDER",
    "B2B_SALESPERSON",
    "B2B_CREATOR",
    "B2B_MARKETER",
    "ENTREPRENEUR",
    "PROFESSIONAL",
    "JOB_SEEKER",
    "STUDENT",
    "OTHER"
  ], {
    required_error: "Please select your role",
  }),
  referralSource: z.enum([
    "FRIEND_COWORKER",
    "WEB_SEARCH",
    "LINKEDIN",
    "TWITTER_X",
    "INSTAGRAM",
    "YOUTUBE",
    "OTHER"
  ], {
    required_error: "Please select where you heard about us",
  }),
  company: z.string().min(1, "Please enter your company name").max(100),
});

// Animation variants for slide transitions
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 500 : -500,
    opacity: 0
  })
};

// Transition settings for smooth animations
const transition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.3 }
};

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, update, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
    },
  });

  useEffect(() => {
    // Redirect unauthenticated users to login
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    // Redirect admin users to their dashboard
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    }
  }, [status, router, session]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session || !session.user || !session.user.id) {
      toast.error("You must be logged in to complete onboarding");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/users/onboarding", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          role: values.role,
          referralSource: values.referralSource,
          company: values.company,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update profile");
      }

      // Update session with new values
      await update({
        ...session,
        user: {
          ...session.user,
          role: values.role,
          referralSource: values.referralSource,
          company: values.company
        },
      });

      toast.success("Profile updated successfully", {
        description: "Redirecting to your dashboard...",
        closeButton: true,
      });

      router.push("/dashboard");

      setTimeout(() => {
        // If we're still on the same page after attempting navigation, try again with refresh
        if (window.location.pathname.includes('/onboarding')) {
          router.refresh();
          router.push("/dashboard");
        }
      }, 300);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Failed to update profile", {
        description: error.message || "Please try again",
        closeButton: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Don't render the form if not authenticated
  if (status === "unauthenticated") {
    return null;
  }

  const nextStep = () => {
    if (step === 0 && !form.getValues("role")) {
      form.setError("role", {
        type: "manual",
        message: "Please select your role to continue"
      });
      return;
    }

    if (step === 1 && !form.getValues("referralSource")) {
      form.setError("referralSource", {
        type: "manual",
        message: "Please tell us how you heard about us"
      });
      return;
    }

    setDirection(1); // Moving forward
    setStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setDirection(-1); // Moving backward
    setStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <motion.div
            key="role-step"
            className="flex"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <div className="w-1/2 bg-black text-white p-8 flex flex-col justify-center rounded-l-lg">
              <h3 className="text-2xl font-bold mb-4">Welcome aboard!</h3>
              <p className="text-gray-300">
                Tell us about your role to help us tailor your experience and provide the most relevant features.
              </p>
              <Image
                src="/onboarding-role.svg"
                alt="Role illustration"
                width={200}
                height={160}
                className="mt-8 self-center"
              />
            </div>
            <div className="w-1/2 bg-white p-8 rounded-r-lg">
              <h2 className="text-2xl font-bold mb-6">What's your role?</h2>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Select what best describes your position</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="B2B_FOUNDER">B2B Founder</SelectItem>
                          <SelectItem value="B2B_SALESPERSON">B2B Salesperson</SelectItem>
                          <SelectItem value="B2B_CREATOR">B2B Creator</SelectItem>
                          <SelectItem value="B2B_MARKETER">B2B Marketer</SelectItem>
                          <SelectItem value="ENTREPRENEUR">Entrepreneur</SelectItem>
                          <SelectItem value="PROFESSIONAL">Professional</SelectItem>
                          <SelectItem value="JOB_SEEKER">Job Seeker</SelectItem>
                          <SelectItem value="STUDENT">Student</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={nextStep}
                className="w-full mt-8 bg-black hover:bg-gray-800 text-white"
              >
                Continue
                <Icon icon="ion:arrow-forward" className="ml-2" />
              </Button>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="referral-step"
            className="flex"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <div className="w-1/2 bg-gray-900 text-white p-8 flex flex-col justify-center rounded-l-lg">
              <h3 className="text-2xl font-bold mb-4">We're curious</h3>
              <p className="text-gray-300">
                Knowing how you found us helps us better understand our audience and improve our outreach.
              </p>
              <Image
                src="/onboarding-referral.svg"
                alt="Referral illustration"
                width={200}
                height={160}
                className="mt-8 self-center"
              />
            </div>
            <div className="w-1/2 bg-white p-8 rounded-r-lg">
              <h2 className="text-2xl font-bold mb-6">How did you hear about us?</h2>
              <FormField
                control={form.control}
                name="referralSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Select where you discovered DM Demand</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FRIEND_COWORKER">Friend/Co-Worker</SelectItem>
                          <SelectItem value="WEB_SEARCH">Web Search</SelectItem>
                          <SelectItem value="LINKEDIN">LinkedIn</SelectItem>
                          <SelectItem value="TWITTER_X">Twitter/X</SelectItem>
                          <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                          <SelectItem value="YOUTUBE">YouTube</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4 mt-8">
                <Button
                  type="button"
                  onClick={previousStep}
                  variant="outline"
                  className="w-1/2"
                >
                  <Icon icon="ion:arrow-back" className="mr-2" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-1/2 bg-black hover:bg-gray-800 text-white"
                >
                  Continue
                  <Icon icon="ion:arrow-forward" className="ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="company-step"
            className="flex"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <div className="w-1/2 bg-gray-800 text-white p-8 flex flex-col justify-center rounded-l-lg">
              <h3 className="text-2xl font-bold mb-4">Almost done!</h3>
              <p className="text-gray-300">
                This will help us connect you with other professionals in your industry and customize your experience.
              </p>
              <Image
                src="/onboarding-company.svg"
                alt="Company illustration"
                width={200}
                height={160}
                className="mt-8 self-center"
              />
            </div>
            <div className="w-1/2 bg-white p-8 rounded-r-lg">
              <h2 className="text-2xl font-bold mb-6">Where do you work?</h2>
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Enter your company or organization name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Company name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4 mt-8">
                <Button
                  type="button"
                  onClick={previousStep}
                  variant="outline"
                  className="w-1/2"
                >
                  <Icon icon="ion:arrow-back" className="mr-2" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="w-1/2 bg-black hover:bg-gray-800 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="ion:hourglass-outline" className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete
                      <Icon icon="ion:checkmark-circle" className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8 relative">
      {/* Background blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-40 filter blur-sm bg-gradient-to-r from-gray-200 to-gray-100"
        style={{ backgroundImage: "url('/background-pattern.svg')" }}
      />

      {/* Content */}
      <div className="relative max-w-4xl w-full mx-auto">
        {/* Progress indicators */}
        <div className="mb-8 flex justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 w-16 mx-1 rounded-full ${step >= i ? 'bg-black' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        {/* Cards with overflow hidden to contain animations */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {renderStep()}
              </AnimatePresence>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}