"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import Link from "next/link";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function AdminSignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: ""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          role: "ADMIN"
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create admin account");
      }

      toast.success("Admin account has been created", {
        closeButton: true,
      });

      router.push("/admin/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", {
        closeButton: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Personal details section */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-500">Admin details</div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md flex flex-row items-center justify-between px-3 gap-6 py-4">
                <Label htmlFor="firstName" className="text-sm text-gray-500 mb-1">First name</Label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  className="w-full outline-none text-gray-800"
                  {...form.register("firstName")}
                />
                {form.formState.errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.firstName.message}</p>
                )}
              </div>

              <div className="border rounded-md flex flex-row items-center justify-between px-3 gap-6 py-4">
                <Label htmlFor="lastName" className="text-sm text-gray-500 mb-1">Last name</Label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  className="w-full outline-none text-gray-800"
                  {...form.register("lastName")}
                />
                {form.formState.errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Email field */}
          <div className="border rounded-md flex flex-row items-center justify-between px-3 gap-12 py-4">
            <Label htmlFor="email" className="text-sm text-gray-500 mb-1">Email</Label>
            <input
              id="email"
              type="email"
              placeholder="admin@domain.com"
              className="w-full outline-none text-gray-800"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Password field */}
          <div className="border rounded-md px-4 py-3 flex justify-between items-center">
            <div className="flex flex-row items-center justify-between gap-6 py-2">
              <Label htmlFor="password" className="text-sm text-gray-500 mb-1">Password</Label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full outline-none text-gray-800"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>
            <div className="ml-2">
              <button
                title="showPassword"
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon icon={showPassword ? "ion:eye-off-outline" : "ion:eye-outline"} width="20" height="20" />
              </button>
            </div>
          </div>

          {/* Confirmation field */}
          <div className="border rounded-md px-4 py-3 flex justify-between items-center">
            <div className="flex flex-row items-center justify-between gap-6 py-2">
              <Label htmlFor="confirmPassword" className="text-sm text-gray-500 mb-1">Confirmation</Label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full outline-none text-gray-800"
                {...form.register("confirmPassword")}
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="ml-2">
              <button
                title="showConfirmPassword"
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon icon={showConfirmPassword ? "ion:eye-off-outline" : "ion:eye-outline"} width="20" height="20" />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Admin Account"}
            </button>
            <Link
              href="/admin/login"
              className="flex-1 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-50 flex items-center justify-center"
            >
              Log in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}