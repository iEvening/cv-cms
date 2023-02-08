export type Contents = {
    id: string
    name: string
    title: string
    content: string | null
    authorId: string
    createdAt: Date
}

export type Menu = {
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