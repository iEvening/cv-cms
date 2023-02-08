export default function CustomModal({title, onSubmit, onClose, children}
                                        : { title?: string, onSubmit: () => void, onClose: () => void, children: JSX.Element }) {
    return (
        <div
            className={"bg-slate-800 w-screen min-h-screen top-0 absolute z-30 flex justify-center pt-10 pb-10"}
            style={{
                backgroundColor: "rgba(30,41,59, 0.9)",
                marginTop: 72,
                minHeight: 305,
                height: "calc(100vh - 129px)"
            }}
            onClick={onClose}>

            <div
                className={"w-screen sm:w-1/3 bg-slate-200 ml-5 mr-5 sm:ml-0 sm:mr-0 z-40 rounded-lg shadow"}
                style={{maxHeight: 225}}
                onClick={(e) => {
                    e.stopPropagation();
                }}>
                <div className={"flex flex-col h-full"}>
                    <div className={"bg-slate-300 rounded-t-lg"}
                         style={{borderBottomWidth: 1, borderBottomColor: "#C0C5CC"}}>
                        <div className={"flex-1 justify-end flex"}>
                            <div className={"flex-1 grid justify-center align-middle"}>
                                <label className={"flex-wrap text-lg pt-1 font-medium"}>{title}</label>
                            </div>
                            <button className={"pr-3 pl-3 text-2xl bg-red-500 rounded-r-lg rounded-b-none pb-2"}
                                    onClick={onClose}>x
                            </button>
                        </div>
                    </div>

                    <div className={"flex-1 text-lg p-2 text-slate-900 text-center"}>
                        {children}
                    </div>

                    <div className={"flex"} style={{borderTopWidth: 1, borderTopColor: "#C0C5CC"}}>
                        <div className={"flex-1 grid bg-slate-300 rounded-b-lg rounded-r-none"}>
                            <button className={"justify-self-center h-10 w-full"} onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                        <div className={"flex-1 grid bg-red-500 rounded-b-lg rounded-l-none"}
                             style={{borderLeftWidth: 1, borderLeftColor: "#909499"}}>
                            <button className={"justify-self-center h-10 w-full"} onClick={onSubmit}>
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}