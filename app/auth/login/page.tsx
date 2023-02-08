"use client";

import {signIn} from "next-auth/react";
import {useRef} from "react";

const handleSubmit = async (username: any, password: any) => {
    const result = await signIn("credentials", {
        username: username.current.value,
        password: password.current.value,
        redirect: true,
        callbackUrl: "/",
    });
}

export default function LoginPage() {
    const username = useRef(null);
    const password = useRef(null);


    return (
        <div className="fixed pin items-center justify-center z-30 shadow" style={{top: 77, right: 5}}>
            <div className="relative mx-auto w-full z-20">
                <div className="shadow-lg bg-white rounded-lg p-6 pt-2">

                    <h1 className="text-center text-2xl ">Login</h1>

                    <form className="pt-6 pb-2 my-2">
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input ref={username}
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                   id="email" type="text" placeholder="Email Address"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input ref={password}
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
                                   id="password" type="password" placeholder="Password"/>
                        </div>
                        <div className="block items-center justify-between">
                            <div>
                                <button
                                    className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 w-full"
                                    type="button"
                                    onClick={() => handleSubmit(username, password)}>
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}