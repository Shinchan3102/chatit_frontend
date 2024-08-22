"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios";
import chatit_svg from '@/assets/chatit.svg';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const signUpFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});


const SignUpPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {

    const strapiData = {
      username: values.username,
      email: values.email,
      password: values.password,
    }

    try {
      const baseUrl: string = process.env.NEXT_PUBLIC_STRAPI_BASE_URL!
      const response = await axios.post(baseUrl + "/api/auth/local/register", strapiData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200) {
        router.push("/sign-in");
        toast.success("Account created successfully");
      }
      else {
        toast.error("Failed to sign up", {
          description: "Please keep the username and email unique",
        });
      }

    } catch (error: any) {
      console.log(error)
      console.error("Error creating account:", error.message ? error.message : "wrong")
      toast.error("Failed to sign up", {
        description: error?.response?.data?.error?.message ? error.response.data.error.message : "Please keep the username and email unique",
      });
    }
  }

  return (
    <Card className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex flex-col items-center gap-2">
          <Image
            src={chatit_svg}
            alt="ChatIt Logo"
            width={50}
            height={50}
          />
          <div className="flex items-center gap-2">
            <span>Sign Up to</span> <span className="text-primary">ChatIt</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
              Sign Up
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary">
                Sign In
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
};

export default SignUpPage;
