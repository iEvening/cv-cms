import React, {useMemo} from "react";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";

export default function QuillEditor<T extends FieldValues, N>({control, name, rules}
                                                                  : { control: Control<T, any> | undefined, name: any, rules?: any }) {

    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), {ssr: false}), []);

    return (
        <Controller
            name={name}
            control={control}
            render={({field: {onChange, onBlur, value}}) => (

                <ReactQuill
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    style={{height: 300}}
                    placeholder={"Content of the page"}
                />

            )}/>
    )
}