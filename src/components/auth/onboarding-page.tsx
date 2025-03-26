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

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, update, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
    },
  });


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

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

      // Update session
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

setTimeout(() => {
  router.push("/dashboard");
}, 500);

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

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Don't render the form if not authenticated
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
          <div className="text-center">
            <Image
              src="/onboarding.svg"
              alt="Onboarding illustration"
              width={200}
              height={160}
              className="mx-auto"
              priority
            />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Tell us about yourself
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Help us customize your experience
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What best describes your role?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referralSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Where did you hear about us?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a source" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What company do you work at?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your company name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="ion:hourglass-outline" className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Continue to Dashboard"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}