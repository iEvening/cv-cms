import './globals.css'

import React from "react";
import Providers from "@/app/providers";


import Background_img from "@/public/images/bg-mj_hres.png";

import {getServerSession} from "next-auth/next"
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {


    return (
        <html lang="en">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <head/>
        <body style={{
            backgroundImage: `url(${Background_img.src})`,
            backgroundSize: "cover"
        }}>
        <Providers>
            {children}
        </Providers>
        <div className={"flex align-middle justify-center mt-4"} style={{backgroundColor: "rgba(22,31,44,0.95)"}}>
            <footer className="text-sm leading-6 w-full max-w-screen-lg">
                <div
                    className="pt-4 pb-4 border-t border-slate-100 flex justify-between text-slate-400 pl-4 pr-4">
                    <div className="mr-2 text-zinc-50 font-bold  hover:text-slate-600">
                        <p>Copyright © 2023</p>
                    </div>
                    <div className="text-zinc-50 font-bold hover:text-slate-600">
                        by Adam
                    </div>
                </div>
            </footer>
        </div>
        </body>
        </html>
    )
}
