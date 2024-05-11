"use client";
import { loginUser, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
	name: string;
	email: string;
	password: string;
};

export const NewAccountForm = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInputs>();

	const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
		const { name, email, password } = data;
		const resp = await registerUser(email, password, name);

		if (!resp.ok) {
			setErrorMessage(resp?.message || "Error al registrar usuario");
			return;
		}

		await loginUser(email.toLowerCase(), password);

		window.location.replace("/");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
			{errorMessage && <p className="text-red-500 mx-auto">{errorMessage}</p>}
			<label htmlFor="email">Nombre completo</label>
			<input
				className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
					"border-red-500": errors?.name,
				})}
				type="text"
				{...register("name", { required: true })}
			/>

			<label htmlFor="email">Correo electrónico</label>
			<input
				className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
					"border-red-500": errors?.email,
				})}
				type="email"
				{...register("email", {
					required: true,
					pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
				})}
			/>

			<label htmlFor="email">Contraseña</label>
			<input
				className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
					"border-red-500": errors?.password,
				})}
				type="password"
				{...register("password", { required: true, minLength: 6 })}
			/>
			{errors?.password && (
				<p className="text-red-500">
					La contraseña debe tener al menos 6 caracteres
				</p>
			)}

			<button className="btn-primary">Registrarse</button>

			{/* divisor l ine */}
			<div className="flex items-center my-5">
				<div className="flex-1 border-t border-gray-500"></div>
				<div className="px-2 text-gray-800">O</div>
				<div className="flex-1 border-t border-gray-500"></div>
			</div>

			<Link href="/auth/login" className="btn-secondary text-center">
				Ingresar
			</Link>
		</form>
	);
};
