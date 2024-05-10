"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const registerUser = async (
	email: string,
	password: string,
	name: string
) => {
	try {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: bcryptjs.hashSync(password),
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		return {
			ok: true,
			user,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Ya se creo una cuenta con este correo",
		};
	}
};
