import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import load from "@/lib/load";
import {PrismaClient} from "@prisma/client";
import {compare} from "bcrypt";
import {prisma} from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                const {username, password} = credentials as {
                    username: string;
                    password: string;
                };

                if (!username || !password) {
                    throw new Error("Missing username or password!");
                }

                const user = await prisma.user.findUnique({
                    where: {username: username.trim()}
                });

                if (!user || !(await compare(password.trim(), user.password))) {
                    throw new Error("Invalid username or password!");
                }

                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        updatedAt: new Date(),
                    }
                });


                return {...user, name: user.name, email: user.id, image: user.role.toString()};

            }
        })
    ],

    session: {
        strategy: "jwt"
    },

    callbacks: {
        async jwt({token, account, user}) {
            /*return {...token, ...user};*/
            if (account) {
                token.accessToken = account?.access_token
                token.id = user?.id
            }
            return token
        },
        async session({session, token, user}) {
            return session;
        },
    },

    /*    pages: {
            signIn: "/auth/login",
        },*/
}
export default NextAuth(authOptions)