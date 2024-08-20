import { redirect } from "next/navigation";
import { z } from "zod";
import jwt from "jsonwebtoken";
import axios from "axios";
import SignInForm from "@/components/forms/SignInForm";



const SignInPage = async () => {
  
  // const session = await auth();
  // console.log(session);
  // console.log("session");
  // if (session) {
  //   redirect("/");
  // }

  return <SignInForm />;
};

export default SignInPage;
