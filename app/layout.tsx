import './globals.css'

import React from "react";
import Providers from "@/app/providers";

import Background_img from "@/public/images/bg-mj_hres.png";
import Menu from "@/components/Menu";

export default function RootLayout({children}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">

        <head/>

        <body style={{
            backgroundImage: `url(${Background_img.src})`,
            backgroundSize: "cover"
        }}>

        <Providers>
            {children}
        </Providers>

        </body>
        </html>
    )
}
