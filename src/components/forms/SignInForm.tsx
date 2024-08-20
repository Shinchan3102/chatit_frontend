"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios";

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
import { setCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import { toast } from "sonner"


export const signInFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});



export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {

    const response = await axios.post("/api/generate-token", {
      username: values.username,
      email: values.email,
    });

    const { token } = response.data;

    const strapiData = {
      data: {
        username: values.username,
        email: values.email,
        token,
      },
    }

    try {
      const response = await axios.post("http://localhost:1337/api/accounts", strapiData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200) {
        document.cookie = setCookie("userToken", response.data);
        router.push("/");
        toast.success("Signed in successfully");
      }
      else {
        toast.error("Failed to sign in",{
          description: "Please keep the username and email unique",
        });
      }

      console.log(response)
    } catch (error: any) {
      console.error("Error creating account:", error.response ? error.response.data : error.message)
      toast.error("Failed to sign in",{
        description: "Please keep the username and email unique",
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Username Field */}
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

              {/* Email Field */}
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

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
