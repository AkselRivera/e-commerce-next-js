import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const session = await auth();

	// if (session?.user) {
	// 	redirect("/");
	// }

	return (
		<div className="min-h-screen flex justify-center">
			<div className="w-full  sm:max-w-md px-10">{children}</div>
		</div>
	);
}
