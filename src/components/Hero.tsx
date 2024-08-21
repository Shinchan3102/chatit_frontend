import Image from 'next/image'
import React from 'react'
import chatit_gif from "@/assets/chatit.svg";

export default function Hero() {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="text-center relative flex flex-col items-center">
          <Image
            src={chatit_gif}
            alt="ChatIt Logo"
            width={200}
            height={100}
          />
          <h1 className="text-2xl font-bold">Welcome to ChatIt</h1>
          <p className="mt-2 text-gray-500">
            ChatIt is a simple chat application built with Next and Strapi.
          </p>
        </div>
      </div>
    </div>
  )
}
