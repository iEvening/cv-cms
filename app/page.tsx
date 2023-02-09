'use client';

import {Inter} from '@next/font/google'
import React from "react";
import MainContainer from "@/components/MainContainer";


import React_img from "public/images/react.svg";
import Next_img from "public/images/nextjs.png";
import Tailwind_img from "public/images/tailwind.png";
import ReactQ_img from "public/images/react-q.svg";
import Prisma_img from "public/images/prisma.svg";
import Vercel_img from "public/vercel.svg";
import Auth_img from "public/images/auth.png";
import Forms_img from "public/images/Forms.svg";
import Toast_img from "public/images/toast.png";
import Quill_img from "public/images/quill.svg";
import Analytics_img from "public/images/analytics.png";

import CardItem from "@/components/CardItem";

const inter = Inter({subsets: ['latin']})

export default function Home() {

    const data = [
        {
            id: "R0",
            title: "React + TypeScript",
            short: "A JavaScript library for building user interfaces",
            text: "Build encapsulated components that manage their own state, then compose them to make complex UIs.",
            href: "https://reactjs.org/",
            src: React_img
        },
        {
            id: "N1",
            title: "Next.js",
            short: "The React Framework for the Web",
            text: "Used by some of the worlds largest companies, Next.js enables you to create full-stack web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.",
            href:"https://nextjs.org/",
            src: Next_img
        },
        {
            id: "T2",
            title: "Tailwind CSS",
            short: "Rapidly build modern websites without ever leaving your HTML",
            text: "A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.",
            href: "https://tailwindcss.com/",
            src: Tailwind_img
        },
        {
            id: "R3",
            title: "React Query",
            short: "Performant and powerful data synchronization for React",
            text: "Fetch, cache and update data in your React and React Native applications all without touching any global state.",
            href: "https://react-query-v3.tanstack.com/",
            src: ReactQ_img
        },
        {
            id: "P4",
            title: "Prisma",
            short: "Next-generation Node.js and TypeScript ORM",
            text: "Prisma unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion.",
            href: "https://www.prisma.io/",
            src: Prisma_img
        },
        {
            id: "N5",
            title: "NextAuth",
            short: "Open Source. Full Stack. Own Your Data.",
            text: "NextAuth.js is a complete open source authentication solution for Next.js applications.",
            href: "https://next-auth.js.org/",
            src: Auth_img
        },
        {
            id: "H6",
            title: "React Hook Form",
            short: "Validate your forms with ease.",
            text: "Performant, flexible and extensible forms with easy-to-use validation.",
            href: "https://react-hook-form.com/",
            src: Forms_img
        },
        {
            id: "T7",
            title: "React-Toastify",
            short: "A React toast library",
            text: "React-Toastify allows you to add notifications to your app with ease. No more nonsense!",
            href: "https://github.com/fkhadra/react-toastify",
            src: Toast_img
        },
        {
            id: "Q8",
            title: "Quill",
            short: "Your powerful, rich text editor",
            text: "QuillJS is a modern rich text editor built for compatibility and extensibility. It was created by Jason Chen and Byron Milligan and open sourced by Salesforce.",
            href: "https://github.com/zenoamaro/react-quill",
            src: Quill_img
        },
        {
            id: "V9",
            title: "Vercel",
            short: "Develop.Preview.Ship.",
            text: "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
            href: "https://vercel.com/",
            src: Vercel_img
        },
        {
            id: "A10",
            title: "Vercel/analytics",
            short: "Better insights. Peak performance.",
            text: "Upgrade your post-launch workflow with actionable insights, then experiment until you reach peak conversion rates.",
            href: "https://vercel.com/analytics",
            src: Analytics_img
        },
        /*        {
                    id: "P6",
                    title: "PWA",
                    short: "A progressive web application",
                    text: "A progressive web app, is a type of application software delivered through the web, built using common web technologies including HTML, CSS, JavaScript, and WebAssembly.",
                    src: Pwa_img
                }*/
    ];

    const max = (data.length - 1);

    return (
        <>
            <MainContainer>
                <div className="max-w-3xl mx-auto pt-5 xl:max-w-none">
                    <header id="header" className="relative z-20">
                        <div className="max-w-2xl mx-auto bg-white shadow py-8">
                            <blockquote className="text-2xl font-semi-bold italic text-center text-slate-900">
                                The <span
                                className="relative inline-block before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500"><span
                                className="relative text-white">Tech Stack</span></span> used for the Web App
                            </blockquote>
                        </div>
                        <p className="mt-2 text-lg text-slate-700">

                        </p>
                    </header>
                    <div className="max-w-2xl mx-auto ">

                        {data.map((elem, i) => (
                            <React.Fragment key={elem.id + "_" + i}>
                                <CardItem title={elem.title} short={elem.short} text={elem.text}
                                          href={elem.href} src={elem.src}/>
                                {/*                            {(i < max) && <CustomIcon name={"plus"} fill={"bg-slate-800"}/>}*/}
                            </React.Fragment>
                        ))}


                    </div>
                </div>
            </MainContainer>
        </>
    )
}
