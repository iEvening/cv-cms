import {signIn} from "next-auth/react";

export default function ModalLogin({handleClose}: { handleClose: () => void }) {
    /*       original template from: https://tailwindcomponents.com/component/login-modal ... had to fix it */

    return (
        /*        <div style={{backgroundColor: "rgba(0,0,0, 0.6)", flex: 1}} className={"fixed w-full h-full z-50 top-0"}>*/
        <div className="fixed pin items-center justify-center z-30 shadow" style={{top: 77, right: 5}}>
            <div className="relative mx-auto w-full z-20">
                <div className="shadow-lg bg-white rounded-lg p-6 pt-2">
                    <div className="flex justify-end">
                        <button onClick={handleClose}>
                            <span className="mr-2 text-red-800 text-xl font-bold">x</span>
                            <span>
                            <i className="fa fa-times"></i>
                        </span>
                        </button>
                    </div>

                    <h1 className="text-center text-2xl ">Login</h1>

                    <form className="pt-6 pb-2 my-2">
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                id="email" type="text" placeholder="Email Address"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
                                id="password" type="password" placeholder="Password"/>
                        </div>
                        <div className="block items-center justify-between">
                            <div>
                                <button
                                    className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 w-full"
                                    type="button"
                                    onClick={() => signIn()}>
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        /*        </div>*/
    )
}