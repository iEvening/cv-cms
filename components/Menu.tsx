'use client';

import React, {useState} from "react";
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import SmallSpinner from "@/components/SmallSpinner";
import {TMenu} from "@/data/Types";
import {getSecureMenuContent} from "@/lib/handlers/apiHandlers";


export default function Menu() {

    const session = useSession();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuOpen = () => {
        setMenuOpen((prev) => !prev);
    }


    const {
        isLoading,
        isFetched,
        isPaused,
        isStale,
        isFetchedAfterMount,
        isFetching,
        data,
        isInitialLoading
    }: { isLoading: boolean, data: any, isInitialLoading: boolean, isFetched: boolean, isPaused: boolean, isStale: boolean, isFetchedAfterMount: boolean, isFetching: boolean } = useQuery({
        queryKey: ['menu'],
        queryFn: getSecureMenuContent,
        enabled: (!!session && session.status === "authenticated"),
        retry: 0,
    })


    const SecureMenuContent = data?.menu?.map((elem: TMenu) => (
        <li key={elem.id} className={"hover:text-emerald-400 active:text-emerald-800"}>
            <Link href={`admin/contents/${elem.name === "manager" ? "" : elem.name}`}>
                {elem.title}
            </Link>
        </li>
    ));

    /*        console.log(
                {isLoading},
                {isFetched},
                {isPaused},
                {isStale},
                {isFetchedAfterMount},
                {isFetching},
                {isInitialLoading},
                {session}
            )*/

    return (
        <>
            <div
                className="sticky top-0 z-40 w-full lg:border-b lg:border-slate-900/10 bg-slate-800">
                <div className="max-w-8xl mx-auto">
                    <div className="py-4 lg:px-8 lg:border-0 mx-4 lg:mx-0 flex justify-between" style={{minHeight: 72}}>

                        {(isInitialLoading)
                            ? (<SmallSpinner/>)
                            : (
                                <>
                                    <button type="button"
                                            className="text-white bg-blue-900 active:bg-slate-800 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 flex md:hidden"
                                            onClick={handleMenuOpen}>
                                        ☰
                                    </button>
                                    <div
                                        className={` items-center md:flex md:relative md:mt-0 md:p-0 md:border-0 ${menuOpen ? "block absolute mt-14 p-4 border-2 max-w-40 bg-slate-800 z-20" : "hidden"} `}>
                                        <nav
                                            className="text-sm leading-6 font-semi-bold text-slate-100">

                                            <ul className={`${menuOpen ? "space-y-3 md:flex md:space-y-0 md:space-x-8" : "flex space-x-8"}  text-base font-medium`}>
                                                <>
                                                    <li className="hover:text-emerald-200 hover:text-emerald-400 active:text-emerald-800">
                                                        <Link href="/">
                                                            Home
                                                        </Link>

                                                    </li>

                                                    <>
                                                        {session.status === "authenticated" && (
                                                            <>
                                                                <li className={"hover:text-emerald-400 active:text-emerald-800"}>
                                                                    <Link href="/admin/contents">
                                                                        Content Manager
                                                                    </Link>
                                                                </li>
                                                                {SecureMenuContent}
                                                            </>
                                                        )}
                                                    </>
                                                </>
                                            </ul>
                                        </nav>
                                    </div>

                                    <div className="relative flex items-center px-4">
                                        <div className="relative lg:flex items-center">
                                            <nav
                                                className="text-sm leading-6 font-semi-bold text-slate-100">


                                                {session.status === "authenticated" ? (
                                                    <div className={"flex flex-wrap"}>
                                                        <div
                                                            className="text-slate-200 self-center pr-4 pl-4 text-xl font-medium cursor-pointer hover:text-emerald-400 active:text-emerald-800">
                                                            {session?.data?.user?.name}
                                                        </div>
                                                        <button type="button"
                                                                className="text-white bg-red-500 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 mr-2"
                                                                onClick={() => signOut()}>
                                                            Logout
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button type="button"
                                                            className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 mr-2"
                                                            onClick={() => signIn()}>
                                                        Login
                                                    </button>
                                                )}

                                            </nav>
                                        </div>
                                    </div>
                                </>
                            )}


                    </div>
                </div>
            </div>
            {/*{modalOpen ? (<ModalLogin handleClose={() => handleLoginModalClose}/>) : null}*/}
        </>
    )
}