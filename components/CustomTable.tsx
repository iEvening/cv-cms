import React from "react";
import CustomIcon from "@/components/CustomIcon";
import {TTableAction, TTableModal} from "@/data/Types";

type TTableOpen<T> = {
    modalData: TTableModal<T>
/*    handlers: {
        add: (elem: any) => void
        edit: (elem: any) => void
        cancel: () => void
    }*/

}

export default function CustomTable<T>({open, headers, data, actions, children}
                                        : { open: TTableOpen<T>, headers: String[], data?: any[], actions: Map<string, TTableAction>, children?: JSX.Element }) {

    const tableHeaderContent = headers.map((elem, ind) => {
        const capitalizedTitle = elem.charAt(0).toUpperCase() + elem.substring(1);

        return (
            <th key={`AD-${ind}`} scope="col" className="px-6 py-3 text-left text-sm font-medium text-slate-900 ">
                {capitalizedTitle}
            </th>
        );
    });

    const actionsHeaderContent = Array.from(actions?.values())?.map((elem, ind) => {
        const capitalizedTitle = elem.key.charAt(0).toUpperCase() + elem.key.substring(1);

        return (
            elem.show ? (
                <th key={`AD-${ind}`} scope="col" className="px-6 py-3 text-left text-sm font-medium text-slate-900 ">
                    {capitalizedTitle}
                </th>
            ) : null
        );
    });

    const tableBodyContent = data?.map((elem, ind) => {

        const edit_handler = () => actions.get("edit")?.handler(elem);
        const delete_handler = () => actions.get("delete")?.handler(elem);

        return (
            <tr key={`AD-${ind}`} className="odd:bg-white even:bg-slate-100 hover:bg-slate-200">
                <>
                    {headers.map((header_elem: any, header_ind) => (
                        <td key={`AD-${header_ind}`}
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                            {elem[header_elem] || "-"}
                        </td>
                    ))}

                    {edit_handler && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                            <button className={"justify-self-center active:bg-slate-600"}
                                    onClick={edit_handler}>
                                <CustomIcon name={"edit"} addClass={"pt-0"} fill={"#1e293b"} stroke={"white"}/>
                            </button>
                        </td>
                    )}

                    {delete_handler && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                            <button className={"justify-self-center active:bg-slate-600"}
                                    onClick={delete_handler}>
                                <CustomIcon name={"delete"} addClass={"pt-0"} fill={"#1e293b"} stroke={"white"}/>
                            </button>
                        </td>
                    )}
                </>
            </tr>
        )
    });



    return (
        <div className={"flex justify-center flex-wrap overflow-x-auto pt-4"}>
            {(open.modalData.type === "add" || open.modalData.type === "edit") && (
                <div
                    className={"grid w-full mb-4 sm:w-4/5 md:w-3/5 lg:w-1/4 lg:mr-4 lg:mb-0 lg:max-w-max overflow-x-auto bg-white rounded p-2 h-fit shadow"}>
                    <div className={"flex flex-col"}>
                        <>
                            {children}
                        </>
                    </div>
                </div>
            )}

            <div className={"grid pb-4 overflow-x-auto max-w-full rounded"}>
                <table className="justify-self-center h-fit border-collapse shadow">
                    <thead className="bg-slate-400 border-b border-slate-200">
                    <tr>
                        {tableHeaderContent}
                        {actionsHeaderContent}
                    </tr>
                    </thead>
                    <tbody>

                    <tr className={"odd:bg-white even:bg-slate-100"}>
                        <td colSpan={(headers?.length > 0) ? (headers.length + (actions?.size || 0) - 1) : undefined}
                            className={"pb-4"}>
                            <button className={"justify-self-center active:bg-slate-600 mt-5 ml-4"}
                                    onClick={actions.get("add")?.handler}>
                                <CustomIcon name={"plus"} addClass={"pt-0"} fill={"#006b56"} stroke={"white"}/>
                            </button>
                        </td>
                    </tr>

                    {tableBodyContent}

                    </tbody>
                </table>
            </div>
        </div>
    )
}