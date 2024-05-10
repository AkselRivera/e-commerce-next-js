import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
	const session = await auth();

	if (!session?.user) {
		// redirect("/auth/login?returnTo=/profile");
		redirect("/");
	}

	return (
		<div>
			<Title title="Perfil" />

			<h3 className="capitalize text-lg">{session.user.role}</h3>

			<pre className="text-sm">{JSON.stringify(session, null, 2)}</pre>
		</div>
	);
}
