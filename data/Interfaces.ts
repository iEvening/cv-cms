import {Contents, Menu} from "@/data/Types";

export interface IResponse {
    error?: {
        type: string,
        message: string
    }
}

export interface IContents extends IResponse {
    pages?: Contents[]
}

export interface IMenu extends IResponse {
    menu?: Menu[]
}