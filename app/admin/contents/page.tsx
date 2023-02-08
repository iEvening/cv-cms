'use client';

import MainContainer from "@/components/MainContainer";
import Spinner from "@/components/Spinner";

import {IContents} from "@/data/Interfaces";
import {useQuery} from "@tanstack/react-query";
import load from "@/lib/load";
import {toast} from "react-toastify";
import React, {Suspense, useMemo, useState} from "react";
import CustomTable from "@/components/CustomTable";
import {Contents, TContentForm, TTableAction, TTableModal} from "@/data/Types";
import CustomModal from "@/components/CustomModal";
import {Controller, useForm} from "react-hook-form";
import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import CustomForm from "@/components/CustomForm";
import QuillEditor from "@/components/QuillEditor";


export default function ContentsPage() {

    /*    const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });*/

    const [modalOpen, setModalOpen] = useState<TTableModal<Contents>>({type: ""});

    const {
        register,
        handleSubmit,
        setValue,
        resetField,
        watch,
        formState: {errors},
        control
    } = useForm<TContentForm>();

    const handlePageAdd = async (elem: any) => {
        if ((!!elem?.name?.length) && (!!elem?.title?.length) && (typeof elem?.content === "string")) {

            const res = await load<IContents>({url: '/api/contents', options: {method: "POST"}, data: {...elem}});

            if (!res.error) {
                toast.success("Page added!");
                handleModalClose();

                refetch();
                /*return res.pages;*/
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
                refetch();
                /*return res.pages;*/
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
                refetch();
                /*return res.pages;*/
            }
        } else {
            toast.error("No ID specified! (website-error)")
        }
    }


    const getContents = async () => {
        return await load({url: '/api/contents', options: {method: "GET"}});
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

    const handlePageEditOpen = (elem: Contents) => {
        clearValues();
        setEditValues(elem);
        setModalOpen({type: "edit", data: elem});
    }

    const handlePageDeleteOpen = (elem: Contents) => {
        setModalOpen({type: "delete", data: elem});
    }

    const handleModalClose = () => {
        clearValues();
        setModalOpen({type: ""});
    }

    function setEditValues(elem: Contents) {
        setValue("name", elem.name);
        setValue("title", elem.title);
        setValue("content", (elem.content || ""));
    }

    function clearValues() {
        /*        setValue("name", "");
                setValue("title", "");
                setValue("content", "");*/

        resetField("name");
        resetField("title");
        resetField("content");
    }


    const {
        isLoading,
        isError,
        data,
        error,
        refetch,
    }: { isLoading: boolean, isError: any, data: any, error: any, refetch: any} = useQuery({
        queryKey: ['pages'],
        queryFn: getContents,
        retry: 0,
        /*        onError: (error) =>
                    toast.error(`Something went wrong!`),*/
    })


/*    if (isFetching) {*/
    if (isLoading) {
        return (<Spinner/>);
    }


    const data_t = data as IContents;

    return (
/*        <Suspense fallback={<Spinner/>}>*/
            <>
                <MainContainer errorMessage={isError ? error.message : undefined}>
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
                        data={data_t?.pages || []}
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