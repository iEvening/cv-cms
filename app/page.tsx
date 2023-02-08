'use client';

import Image from 'next/image'
import {Inter} from '@next/font/google'
import styles from './page.module.css'
import React from "react";
import MainContainer from "@/components/MainContainer";


import React_img from "public/images/react.svg";
import Pwa_img from "public/images/pwa.png";
import Next_img from "public/images/nextjs.png";
import Tailwind_img from "public/images/tailwind.png";
import ReactQ_img from "public/images/react-q.svg";
import Prisma_img from "public/images/prisma.svg";
import CustomIcon from "@/components/CustomIcon";
import Vercel_img from "public/vercel.svg";
import CardItem from "@/components/CardItem";

const inter = Inter({subsets: ['latin']})

export default function Home() {

    const data = [
        {
            id: "R0",
            title: "React + TypeScript",
            short: "A JavaScript library for building user interfaces",
            text: "Build encapsulated components that manage their own state, then compose them to make complex UIs.",
            src: React_img
        },
        {
            id: "N1",
            title: "Next.js",
            short: "The React Framework for the Web",
            text: "Used by some of the worlds largest companies, Next.js enables you to create full-stack web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.",
            src: Next_img
        },
        {
            id: "T2",
            title: "Tailwind CSS",
            short: "Rapidly build modern websites without ever leaving your HTML",
            text: "A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.",
            src: Tailwind_img
        },
        {
            id: "R3",
            title: "React Query",
            short: "Performant and powerful data synchronization for React",
            text: "Fetch, cache and update data in your React and React Native applications all without touching any global state.",
            src: ReactQ_img
        },
        {
            id: "P4",
            title: "Prisma",
            short: "Next-generation Node.js and TypeScript ORM",
            text: "Prisma unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion.",
            src: Prisma_img
        },
        {
            id: "V5",
            title: "Vercel",
            short: "Develop.Preview.Ship.",
            text: "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
            src: Vercel_img
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
                                          src={elem.src}/>
                                {/*                            {(i < max) && <CustomIcon name={"plus"} fill={"bg-slate-800"}/>}*/}
                            </React.Fragment>
                        ))}


                    </div>
                </div>
            </MainContainer>
        </>
    )
}
