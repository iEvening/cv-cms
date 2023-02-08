'use client';

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import React, {ReactNode} from "react";

import {SessionProvider} from "next-auth/react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const queryClient = new QueryClient()

interface IProps {
    children: ReactNode
}

export default function Providers({children}: IProps) {
    /*    const [queryClient] = useState(() => new QueryClient());*/

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                <ToastContainer position={"bottom-right"}/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </ QueryClientProvider>
        </SessionProvider>
    );
}