import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

import { z } from "zod";
import prisma from "./lib/prisma";

const protectedRoutes = ["/profile", "/orders", "/checkout"];
// const authRoutes = ["/auth/login", "/auth/new-account"];

export const authConfig: NextAuthConfig = {
	pages: {
		signIn: "/auth/login",
		newUser: "/auth/new-account",
	},

	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isProtected = protectedRoutes.includes(nextUrl.pathname);
			if (isProtected) {
				if (isLoggedIn) {
					console.log("Protected and logged in");

					return true;
				}
				console.log("Protected but not logged in");
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				console.log("logged in");
				// return Response.redirect(new URL("/", nextUrl));
				return true;
			}

			console.log("Default");
			return true;
		},

		jwt({ token, user }) {
			if (user) {
				token.data = user;
			}
			return token;
		},

		session({ session, token, user }) {
			session.user = token.data as any;
			return session;
		},
	},

	providers: [
		credentials({
			async authorize(credentials) {
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(6) })
					.safeParse(credentials);

				if (!parsedCredentials.success) return null;

				const { email, password } = parsedCredentials.data;

				const user = await prisma.user.findUnique({
					where: { email },
				});

				if (!user) return null;
				if (!bcryptjs.compareSync(password, user.password)) return null;

				const { password: _, ...userWithoutPassword } = user;

				return userWithoutPassword;
			},
		}),
	],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
