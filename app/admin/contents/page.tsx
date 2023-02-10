'use client';

import MainContainer from "@/components/MainContainer";
import Spinner from "@/components/Spinner";

import {IContents} from "@/data/Interfaces";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import load from "@/lib/load";
import {toast} from "react-toastify";
import React, {useState} from "react";
import CustomTable from "@/components/CustomTable";
import {TContents, TContentForm, TTableAction, TTableModal} from "@/data/Types";
import CustomModal from "@/components/CustomModal";
import {useForm} from "react-hook-form";
import CustomForm from "@/components/CustomForm";
import QuillEditor from "@/components/QuillEditor";
import {useSession} from "next-auth/react";

export default function ContentsPage() {

    const queryClient = useQueryClient();

    const session = useSession();

    const [modalOpen, setModalOpen] = useState<TTableModal<TContents>>({type: ""});

    const {
        register,
        handleSubmit,
        setValue,
        resetField,
        formState: {errors},
        control
    } = useForm<TContentForm>({
        defaultValues: {
            content: '',
        }
    });

    const handlePageAdd = async (elem: any) => {
        if ((!!elem?.name?.length) && (!!elem?.title?.length) && (typeof elem?.content === "string")) {

            const res = await load<IContents>({url: '/api/contents', options: {method: "POST"}, data: {...elem}});

            if (!res.error) {
                toast.success("Page added!");
                handleModalClose();

                await queryClient.refetchQueries();
            }

        } else {
            toast.error("Name and Title must be specified! (website-error)")
        }
    }


    const handlePageEdit = async (elem: any) => {
        if ((!!modalOpen.data?.id?.length) && (!!elem?.name?.length) && (!!elem?.title?.length) && (typeof elem?.content === "string")) {

            const res = await load<IContents>({
                url: '/api/contents',
                options: {method: "PUT"},
                data: {...elem, pageId: modalOpen.data?.id}
            });

            if (!res.error) {
                toast.success("Page modified!");
                handleModalClose();

                await queryClient.refetchQueries();
            }

        } else {
            toast.error("Name and Title must be specified! (website-error)")
        }
    }

    const handlePageDelete = async () => {
        if (modalOpen?.data?.id?.length) {
            const res = await load<IContents>({
                url: '/api/contents',
                options: {method: "DELETE"},
                data: {id: modalOpen?.data?.id}
            });

            if (!res.error) {
                toast.success("Page deleted!");
                handleModalClose();

                await queryClient.refetchQueries();
            }
        } else {
            toast.error("No ID specified! (website-error)")
        }
    }


    const getContentsData = async () => {
        return await load({url: '/api/contents', options: {method: "GET"}});
    }

    function getFormattedTableData(data_?: TContents[]) {
        let formattedData;

        formattedData = data_?.map((elem) => {
            return {
                id: elem.id,
                name: elem.name,
                title: elem.title,
                author: elem.author?.name,
                created: new Date(elem.createdAt).toDateString(),
                content: elem.content
            }
        })

        return formattedData;
    }


    function getTableActions(): Map<string, TTableAction> {
        const TAdd = {key: "add", show: false, handler: handlePageAddOpen};
        const TEdit = {key: "edit", show: true, handler: handlePageEditOpen};
        const TDelete = {key: "delete", show: true, handler: handlePageDeleteOpen}

        return new Map([["add", TAdd], ["edit", TEdit], ["delete", TDelete]]);
    }

    const handlePageAddOpen = () => {
        clearValues();
        setModalOpen({type: "add"});
    }

    const handlePageEditOpen = (elem: TContents) => {
        clearValues();
        setEditValues(elem);
        setModalOpen({type: "edit", data: elem});
    }

    const handlePageDeleteOpen = (elem: TContents) => {
        setModalOpen({type: "delete", data: elem});
    }

    const handleModalClose = () => {
        clearValues();
        setModalOpen({type: ""});
    }

    function setEditValues(elem: TContents) {
        setValue("name", elem.name);
        setValue("title", elem.title);
        setValue("content", (elem.content || ""));
    }

    function clearValues() {
        resetField("name");
        resetField("title");
        resetField("content");
    }


    const contentsData = useQuery({
            queryKey: ['pages'],
            queryFn: getContentsData,
            enabled: !!session && session.status === "authenticated",
            retry: 0
        }
    )

    /*        || (contentsData.isFetched && contentsData.isFetching && session.status === "authenticated")*/
    if (session.status === "loading" || (session.status === "authenticated" && contentsData.isLoading)) {
        return (<Spinner/>);

    } else if (session.status === "unauthenticated") {
        return (
            <MainContainer errorMessage={"Not Authorized to view this page!"}/>
        );
    }


    const data_c: { pages?: TContents[], error?: any } = {
        pages: !contentsData.error ? (contentsData.data as IContents).pages : [],
        error: contentsData.error
    }


    return (
        <>
            <MainContainer errorMessage={data_c?.error ? data_c.error.message : undefined}
            >
                <CustomTable
                    open={{
                        modalData: {...modalOpen},
                        /*                        handlers: {
                                                    add: (elem: any) => handlePageSubmit(elem),
                                                    edit: (elem: any) => handlePageEdit(elem),
                                                    cancel: handleModalClose
                                                }*/
                    }}
                    headers={["name", "title", "author", "created"]}
                    data={getFormattedTableData(data_c?.pages)}
                    actions={getTableActions()}>


                    <CustomForm onSubmit={handleSubmit(modalOpen.type === "add" ? handlePageAdd : handlePageEdit)}>
                        <>
                            <div className={"flex flex-col mb-3"}>
                                <label htmlFor={"name"}
                                       className={`${errors.name ? "text-red-600" : ""}`}>Name*</label>
                                <input {...register("name", {required: true})}
                                       className={`p-1 text-lg border ${errors.name ? "border-red-600" : ""}`}/>
                            </div>

                            <div className={"flex flex-col mb-5"}>
                                <label htmlFor={"title"}
                                       className={`${errors.title ? "text-red-600" : ""}`}>Title*</label>
                                <input {...register("title", {required: true})}
                                       className={`p-1 text-lg border ${errors.title ? "border-red-600" : ""}`}/>
                            </div>

                            <QuillEditor control={control} name={"content"} rules={{required: false}}/>

                            <div className={"flex justify-between flex-wrap"} style={{marginTop: 87}}>
                                <button
                                    className={"flex-1 h-10 m-2 rounded bg-slate-300 hover:bg-slate-800 text-white px-3"}
                                    onClick={() => handleModalClose()} style={{width: 70}}>
                                    Cancel
                                </button>
                                <button
                                    type={"submit"}
                                    className={"flex-1 h-10 m-2 rounded bg-blue-600 hover:bg-blue-800 text-white px-3"}
                                    style={{width: 70}}>
                                    Save
                                </button>
                            </div>
                        </>
                    </CustomForm>

                </CustomTable>
            </MainContainer>

            {(modalOpen.type === "delete") ? (
                <CustomModal title={"Delete"} onSubmit={handlePageDelete} onClose={handleModalClose}>
                    <>
                        <>Are you sure you want to delete the selected page?</>
                        <ul className={"text-left pl-2"}>
                            <li title={"name"}><label className={"pr-4 font-bold"}>name:</label>
                                <label>{modalOpen?.data?.name}</label></li>
                            <li title={"title"}><label className={"pr-4 font-bold"}>title: </label>
                                <label>{modalOpen?.data?.title}</label></li>
                        </ul>
                    </>
                </CustomModal>

            ) : null}
        </>
        /*        </Suspense>*/
    )
}