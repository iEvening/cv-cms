import React from "react";

export default function CustomFooter() {
    return (
        <div className={"flex align-middle justify-center mt-4"} style={{backgroundColor: "rgba(22,31,44,0.95)"}}>
            <footer className="text-sm leading-6 w-full max-w-screen-lg">
                <div
                    className="pt-4 pb-4 border-t border-slate-100 flex justify-between text-slate-400 pl-4 pr-4">
                    <div className="mr-2 text-zinc-50 font-bold  hover:text-slate-600">
                        Copyright © 2023
                    </div>
                    <div className="text-zinc-50 font-bold hover:text-slate-600">
                        by Adam
                    </div>
                </div>
            </footer>
        </div>
    )
}