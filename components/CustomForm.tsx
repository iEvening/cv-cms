import React, {useEffect, useState} from "react";

export default function CustomForm({onSubmit, children}: { onSubmit: any, children: JSX.Element }) {


    return (
        <div>
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
}