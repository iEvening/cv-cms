import type {NextApiRequest, NextApiResponse} from 'next'
import {IMenu} from "@/data/Interfaces";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {prisma} from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse<IMenu>) => {

    if (req.method !== 'GET') {
        return res.status(401).json({error: {type: "forbidden", message: "not allowed!"}});
    }


    const session = await getServerSession(req, res, authOptions);

    if (session) {
        const data = await prisma.contents.findMany({select: {id: true, name: true, title: true}});
        return res.json({menu: data});
    } else {
        return res.status(401).json({error: {type: "unauthorized", message: "not authorized!"}});
    }

}