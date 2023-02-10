'use client';

import Head from "next/head";
import Menu from "./Menu";
import {IContents, IMenu} from "@/data/Interfaces";
import ErrorContent from "@/components/ErrorContent";
import React from "react";
import {TMenu} from "@/data/Types";
import CustomFooter from "@/components/CustomFooter";

export default function MainContainer({children, errorMessage}: { children?: JSX.Element, errorMessage?: string }) {
    return (
        <>
            <Menu/>

            <div className="max-w-1xl mx-auto px-3 grid" style={{
                minHeight: "calc(100vh - 146px)"
            }}>

                {!!errorMessage ? (<ErrorContent msg={errorMessage}/>) : (children)}


            </div>
            <CustomFooter/>
        </>
    )
}