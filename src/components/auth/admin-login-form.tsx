"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
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
});

export function AdminLoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        role: "ADMIN", // Pass the role to the credential provider
        redirect: false,
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      toast.success("You have successfully logged in as admin", {
        closeButton: true,
      });

      router.push("/admin/dashboard");
      router.refresh();
    } catch (error: unknown) {
      toast.error("Invalid email or password", {
        description: `${error instanceof Error ? error.message : 'Authentication failed'}`,
        closeButton: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="border rounded-md px-4 py-4 flex justify-between items-center gap-12">
            <Label className="text-sm text-gray-500 mb-1">Email</Label>
            <input
              type="email"
              placeholder="Enter your admin email"
              className="w-full outline-none"
              {...form.register("email")}
            />
          </div>

          <div className="border rounded-md px-4 py-2 flex justify-between items-center">
            <div className="flex flex-row items-center justify-center gap-6 py-2">
              <Label className="text-sm text-gray-500">Password</Label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full outline-none"
                {...form.register("password")}
              />
            </div>
            <div className="flex items-center">
                          <button
                              title="Toggle password visibility"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon icon={showPassword ? "ion:eye-off-outline" : "ion:eye-outline"} width="20" height="20" />
              </button>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in as Admin"}
            </button>
            <Link
              href="/admin/signup"
              className="flex-1 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-50 flex items-center justify-center"
            >
              Register as Admin
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}