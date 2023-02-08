'use client';

import React, {useState} from "react";
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";
import load from "@/lib/load";
import {useQuery} from "@tanstack/react-query";
import SmallSpinner from "@/components/SmallSpinner";
import {IMenu} from "@/data/Interfaces";
import Spinner from "@/components/Spinner";


export default function Menu({content}: { content?: JSX.Element }) {

    const {data: session, status} = useSession();
    /*    console.log({session});*/

    const [menuOpen, setMenuOpen] = useState(false);
    /*    const [modalOpen, setModalOpen] = useState(false);*/

    const handleMenuOpen = () => {
        setMenuOpen((prev) => !prev);
    }

    const getSecureMenuContent = async () => {
/*        console.log("SECURE_MENU_LOADING")*/
        return await load({url: "/api/menu", options: {method: "GET"}});
    }

    function SecureMenuContent(data?: IMenu) {
        return (
            <>
                {session?.user && (
                    <Link href="/admin/contents">
                        Content Manager
                    </Link>
                )}
                {data?.menu?.map((elem) => (
                    <li key={elem.id} className={"hover:text-emerald-400 active:text-emerald-800"}>
                        <Link href={`admin/contents/${elem.name === "manager" ? "" : elem.name}`}>
                            {elem.title}
                        </Link>
                    </li>
                ))}
            </>
        )
    }


    /*    const handleLoginModalOpen = () => {
            setModalOpen((prev) => !prev);
        }*/

    /*    function handleLoginModalClose() {
            setModalOpen(false);
        }*/


    const {
        isLoading,
        isError,
        data,
        error,
        isFetching,
    }: { isLoading: boolean, isError: any, data: any, error: any, isFetching: any } = useQuery({
        queryKey: ['menu'],
        queryFn: getSecureMenuContent,
        enabled: (status === "authenticated"),
        retry: 0
    })


    /*    if (isLoading) {
            return (<Spinner/>);
        }*/

    return (
        <>
            <div
                className="sticky top-0 z-40 w-full lg:border-b lg:border-slate-900/10 bg-slate-800">
                <div className="max-w-8xl mx-auto">
                    <div className="py-4 lg:px-8 lg:border-0 mx-4 lg:mx-0 flex justify-between" style={{minHeight: 72}}>

                        {(isLoading && status !== "unauthenticated")
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
                                                <li className="hover:text-emerald-200 hover:text-emerald-400 active:text-emerald-800">
                                                    <Link href="/">
                                                        Home
                                                    </Link>

                                                </li>

                                                {(!data?.error)
                                                    ? SecureMenuContent(data)
                                                    : null}
                                                {content}
                                            </ul>
                                        </nav>
                                    </div>

                                    <div className="relative flex items-center">
                                        <div className="relative lg:flex items-center">
                                            <nav
                                                className="text-sm leading-6 font-semi-bold text-slate-100">


                                                {session?.user ? (
                                                    <div className={"flex flex-wrap"}>
                                                        <p className="text-slate-200 self-center pr-4 pl-4 text-xl font-medium cursor-pointer hover:text-emerald-400 active:text-emerald-800"> {session.user.name}</p>
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