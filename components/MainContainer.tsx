'use client';

import Head from "next/head";
import Menu from "./Menu";
import {IContents} from "@/data/Interfaces";
import ErrorContent from "@/components/ErrorContent";
import React from "react";

export default function MainContainer({children, errorMessage}: { children: JSX.Element, errorMessage?: string }) {
    return (
        <div>

            <Menu/>

            <div className="max-w-1xl mx-auto px-4 grid"
                 style={{
                     minHeight: "calc(100vh - 145px)"
                 }}>
                {!!errorMessage ? (<ErrorContent msg={errorMessage}/>) : (children)}
            </div>

        </div>
    )
}