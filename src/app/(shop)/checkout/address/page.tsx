import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";
import { AddressForm, Title } from "@/components";
import { Country } from "@/interfaces";
import { redirect } from "next/navigation";

export default async function AddressPage() {
	const countries: Country[] = await getCountries();

	const session = await auth();

	if (!session?.user) {
		redirect("/auth/login?returnTo=/checkout/address");
	}

	const userAddress = await getUserAddress(session.user.id);

	return (
		<div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
			<div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
				<Title title="Dirección" subtitle="Dirección de entrega" />

				<AddressForm countries={countries} userStoredAddress={userAddress} />
			</div>
		</div>
	);
}
