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
import { setAuthCookies } from "@/utils/cookie";

const signInFormSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});


const SignInPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {


    const strapiData = {
      password: values.password,
      identifier: values.email,
    }

    try {
      const baseUrl: string = process.env.NEXT_PUBLIC_STRAPI_BASE_URL!
      const response = await axios.post(baseUrl + "/api/auth/local", strapiData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200) {
        setAuthCookies(response.data);
        router.push("/home");
        toast.success("Signed in successfully");
      }
      else {
        toast.error("Failed to sign in", {
          description: "Please keep the password and email unique",
        });
      }

      console.log(response)
    } catch (error: any) {
      console.log(error);
      console.error("Error creating account:", error.response ? error.response.data : error.message)
      toast.error("Failed to sign in", {
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
            <span>Sign In to</span> <span className="text-primary">ChatIt</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              Sign In
            </Button>
            <div className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-primary">
                Sign Up
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
};

export default SignInPage;
