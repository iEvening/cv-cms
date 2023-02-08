'use client';

import {useQuery} from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import {IContents} from "@/data/Interfaces";
import MainContainer from "@/components/MainContainer";
import load from "@/lib/load";
import React, {createElement} from "react";
import parse from 'html-react-parser';

export default function Page({params, searchParams}: {
    params: { name: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {

    const getContentPage = async () => {
        return await load({url: `/api/contents?name=${params.name}`, options: {method: "GET"}});
    }

    function genPage(content?: string | null) {
        return parse(content || "");
    }

    const {
        isLoading,
        isError,
        data,
        error
    }: { isLoading: boolean, isError: any, data: any, error: any } = useQuery({
        queryKey: ['pages'],
        queryFn: getContentPage,
        retry: 0,
    })


    if (isLoading) {
        return (<Spinner/>);
    }

    const t_data = data as IContents;

    /*    Temp fix... bug: the last navigated page loads once more, after menu navigation started...*/

    return (
        <MainContainer errorMessage={isError ? error.message : undefined}>
            {(t_data?.pages?.length && t_data?.pages[0] && (t_data?.pages[0].name === params.name)) ? (
                <div
                    className="container mx-auto bg-white rounded-xl shadow-md overflow-hidden my-5 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100">
                    <div className={"w-full justify-center align-middle"}>
                        <div className={"bg-slate-900 w-full text-center p-2 pb-3 text-white text-xl"}>
                            <div className={""}>
                                {t_data?.pages[0].title}
                            </div>
                        </div>
                        <div className="p-2 text-slate-500">
                            {genPage(t_data?.pages[0].content)}
                        </div>
                    </div>
                </div>
            ) : <div></div>}

        </MainContainer>
    )

}