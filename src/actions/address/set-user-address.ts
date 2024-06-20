"use server";
import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
	try {
		const newAddress = await createOrReplaceAddress(address, userId);

		return {
			ok: true,
			address: newAddress,
		};
	} catch (error) {
		return {
			ok: false,
			message: "Error al registrar usuario",
			// error: error,
		};
	}
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
	try {
		const storedAddress = await prisma.userAddress.findUnique({
			where: { userId },
		});

		const addressToSave = {
			address: address.address,
			address2: address.address2,
			countryId: address.country,
			firstName: address.firstName,
			lastName: address.lastName,
			phone: address.phone,
			zipCode: address.zipCode,
			city: address.city,
			userId,
		};

		if (!storedAddress) {
			const newAddress = await prisma.userAddress.create({
				data: addressToSave,
			});

			return newAddress;
		}

		const updatedAddress = await prisma.userAddress.update({
			where: { userId },
			data: addressToSave,
		});

		return updatedAddress;
	} catch (error) {
		console.log(error);

		throw new Error("No se pudo grabar la dirección");
	}
};
