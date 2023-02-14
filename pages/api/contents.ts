import type {NextApiRequest, NextApiResponse} from 'next'
import {IContents} from "@/data/Interfaces";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {prisma} from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IContents>) {


    try {

        switch (req.method) {
            case "GET": {
                await handleFetchData();
                break;
            }


            case "POST": {
                await handleAddData();
                break;
            }

            case "PUT": {
                await handleModifyData();
                break;
            }

            case "DELETE": {
                await handleDeleteData();
                break;
            }

            default: {
                await handleInvalid("unauthorized");
                break;
            }
        }

    } catch (e: any) {
        await handleInvalid("teapot");
    }

    async function handleFetchData() {
        const session = await getServerSession(req, res, authOptions);
        const {name} = req.query;

        let query: any = !name ? {
            where: {NOT: {OR: [{name: "manager"}, (parseInt(session?.user?.image || "0") > 3) ? {} : {name: "todo"}]}},
            include: {
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        } : undefined;

        if (name) {
            if (name === "manager") {
                handleInvalid("not_found");
            } else {
                query = {where: {name}};
            }
        }


        if (session) {
            const contents = await prisma.contents.findMany(query);

            if (contents?.length > 0) {
                return res.json({pages: contents});
            } else {
                return handleInvalid("not_found");
            }

        } else {
            return handleInvalid("unauthorized");
        }
    }

    async function handleAddData() {
        const {name, title, content} = req.body && JSON.parse(req.body);

        if ((!!name?.length) && (!!title?.length) && (typeof content === "string")) {
            const session = await getServerSession(req, res, authOptions);
            const user_id = session?.user?.email || "IDK";

            if (session && user_id) {

                try {

                    const addContents = await prisma.contents.create({
                        data: {
                            name: name,
                            title: title,
                            content: content,
                            authorId: user_id
                        }
                    });

                    return res.json({pages: [addContents]});

                } catch (e) {
                    handleInvalid("create_failed");
                }

            }

        } else {
            handleInvalid("bad_request");
        }


    }


    async function handleModifyData() {
        const {pageId, name, title, content} = req.body && JSON.parse(req.body);

        if ((!!pageId?.length) && (!!name?.length) && (!!title?.length) && (typeof content === "string")) {
            const session = await getServerSession(req, res, authOptions);
            const user_id = session?.user?.email || "IDK";

            if (session && user_id) {

                try {

                    const addContents = await prisma.contents.update({
                        where: {
                            id: pageId
                        },
                        data: {
                            name: name,
                            title: title,
                            content: content,
                            authorId: user_id
                        }
                    });

                    return res.json({pages: [addContents]});

                } catch (e) {
                    handleInvalid("update_failed");
                }

            }

        } else {
            handleInvalid("bad_request");
        }
    }

    async function handleDeleteData() {
        const {id} = req.body && JSON.parse(req.body);

        if ((!!id?.length)) {
            const session = await getServerSession(req, res, authOptions);

            if (session) {

                try {

                    const deleteContent = await prisma.contents.delete({
                        where: {
                            id: id
                        }
                    });

                    return res.json({pages: [deleteContent]});

                } catch (e) {
                    handleInvalid("delete_failed");
                }

            }

        } else {
            handleInvalid("bad_request");
        }
    }

    function handleInvalid(type_: string) {

        const findError = [
            {code: 401, type: "unauthorized", message: "You are not authorized to view this page!"},
            {code: 400, type: "bad_request", message: "(400) The request is not valid!"},
            {code: 404, type: "not_found", message: "(404) The requested page is not found!"},
            {code: 500, type: "create_failed", message: "Could not add to the database (name must be unique)!"},
            {code: 500, type: "update_failed", message: "Could not update page in the database (id not found)!"},
            {code: 500, type: "delete_failed", message: "Could not delete from the database (id not found)!"}
        ].find((elem) => elem.type === type_);

        if (findError) {
            const {code, type, message} = findError;

            return res.status(code).json({
                error: {
                    type,
                    message: message
                }
            });

        } else {
            const {code, type, message} = {
                code: 418,
                type: "teapot",
                message: "I'm a teapot... (Unexpected behaviour)"
            };

            return res.status(code).json({
                error: {
                    type,
                    message: message
                }
            });
        }
    }
}