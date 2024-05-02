# Descripción

Esta es un sistema web para gestionar un e-commerce

## Instalar proyecto local

1. Clonar el repositorio
2. Crear una copia del archivo `.env.template` y renombrarlo `.env`
3. Instalar dependencias `npm install`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Correr el DB seed usando `npm run seed`
7. Correr el proyecto con `npm run dev`

## Nota:

Para crear una migracion es necesario usar `npx prisma migrate dev --name NombreMNigracion`

## Ejecutar aplicación en Producción
