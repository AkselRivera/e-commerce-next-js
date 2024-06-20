"use server";

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
	try {
		const addreess = await prisma.userAddress.findUnique({
			where: {
				userId,
			},
		});

		if (!addreess) return null;

		const { countryId, ...rest } = addreess;

		return {
			country: countryId,
			...rest,
		};
	} catch (error) {
		console.log(error);
		return null;
	}
};
