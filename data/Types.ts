export type TContents = {
    id: string
    name: string
    title: string
    content: string | null
    authorId: string
    createdAt: Date
    author?: {
        name: string
    }
}

export type TMenu = {
    id: string
    name: string
    title: string
}

export type TTableAction = {
    key: string
    show: boolean
    handler: (elem: any) => void
}

export type TTableModal<T> = {
    type: "" | "add" | "edit" | "delete"
    data?: T
};

export type TContentForm = {
    name: string
    title: string
    content: string
}