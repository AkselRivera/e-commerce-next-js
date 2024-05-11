"use client";

import { logout } from "@/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
	IoCloseOutline,
	IoLogInOutline,
	IoLogOutOutline,
	IoPeopleOutline,
	IoPersonOutline,
	IoSearchOutline,
	IoShirtOutline,
	IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
	const router = useRouter();
	const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
	const closeMenu = useUIStore((state) => state.closeSideMenu);

	const { data: session, status, update } = useSession();
	const isAuthenticated = !!session?.user;

	const handleLogout = async () => {
		await logout();
		closeMenu();
		window.location.replace("/");
	};

	return (
		<div className="">
			{/* Black background */}
			{isSideMenuOpen && (
				<div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
			)}

			{/* Blur background */}
			{isSideMenuOpen && (
				<div
					className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
					onClick={closeMenu}
				/>
			)}

			{/* Sidebar */}
			<nav
				className={clsx(
					"fixed p-5 right-0 top-0 w-[500px] h-screen z-20 bg-white shadow-2xl transform transition-all duration-300",
					{
						"translate-x-full": !isSideMenuOpen,
					}
				)}
			>
				<IoCloseOutline
					size={30}
					className="absolute top-5 right-5 cursor-pointer"
					onClick={closeMenu}
				/>

				{/* Input */}
				<div className="relative mt-14">
					<IoSearchOutline size={20} className="absolute top-2 left-2" />
					<input
						type="text"
						className="w-full bg-gray-50 pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
						placeholder="Buscar"
					/>
				</div>

				{/* Menu*/}
				{isAuthenticated && (
					<>
						<Link
							href="/profile"
							className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
							onClick={closeMenu}
						>
							<IoPersonOutline size={30} />
							<span className="ml-3 text-xl">Perfil</span>
						</Link>

						<Link
							href="/"
							className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
						>
							<IoTicketOutline size={30} />
							<span className="ml-3 text-xl">Ordenes</span>
						</Link>
					</>
				)}
				{isAuthenticated ? (
					<button
						onClick={() => handleLogout()}
						name={"logout"}
						className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
					>
						<IoLogOutOutline size={30} />
						<span className="ml-3 text-xl">Cerrar sesion</span>
					</button>
				) : (
					<Link
						href="/auth/login"
						className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
						onClick={closeMenu}
					>
						<IoLogInOutline size={30} />
						<span className="ml-3 text-xl">Ingresar</span>
					</Link>
				)}

				{/*  ADMIN OPTIONS*/}

				{session?.user.role === "admin" && (
					<>
						{/* Line separator */}
						<div className="w-full h-[1px] bg-gray-200 my-10" />

						<Link
							href="/"
							className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
						>
							<IoShirtOutline size={30} />
							<span className="ml-3 text-xl">Productos</span>
						</Link>
						<Link
							href="/"
							className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
						>
							<IoTicketOutline size={30} />
							<span className="ml-3 text-xl">Ordenes</span>
						</Link>
						<Link
							href="/"
							className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
						>
							<IoPeopleOutline size={30} />
							<span className="ml-3 text-xl">Clientes</span>
						</Link>
					</>
				)}
			</nav>
		</div>
	);
};
