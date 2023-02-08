import Image from "next/image";
import React_img from "@/public/images/react.svg";
import React from "react";

export default function CardItem(
    {
        title,
        short,
        text,
        src
    }: { title: string, short: string, text: string, src: string }) {

    return (
        <div className="mt-4">
            <div
                className="mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:bg-slate-300">
                <div className="p-8 md:flex justify-center align-middle">
                    <div className="shrink-1 pr-8 flex pb-10 md:pb-0 justify-center align-middle">
                        <Image className="w-40 object-contain" src={src}
                               alt={title}/>
                    </div>
                    <div style={{maxWidth: 460}}>
                        <a href={"https://reactjs.org/"} target={"_blank"} rel={"noreferrer"}
                           className="uppercase tracking-wide text-sm text-indigo-500 font-semi-bold">
                            {title}
                        </a>
                        <div
                            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                            {short}
                        </div>
                        <p className="mt-2 text-slate-500">{text}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}