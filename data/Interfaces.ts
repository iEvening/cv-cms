import {TContents, TMenu} from "@/data/Types";

export interface IResponse {
    error?: {
        type: string,
        message: string
    }
}

export interface IContents extends IResponse {
    pages?: TContents[]
}

export interface IMenu extends IResponse {
    menu?: TMenu[]
}