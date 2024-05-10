import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";
import { AuthProvider } from "@/components";

export const metadata: Metadata = {
	title: {
		default: "e-commerce | Shop",
		template: "%s - e-commerce | Shop",
	},
	description: "Una tienda virtual de productos",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
