# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Prueba la aplicación y la protección de rutas usando el nuevo estandar de React-router-dom 7
[heroes-spa](https://jade-kataifi-29dd91.netlify.app/)
Aplicación web desarrollada con React, que permite a los usuarios explorar y consultar información detallada de superhéroes. Incluye funcionalidades como:

Navegación por rutas protegidas usando React Router.

Gestión de estado de autenticación mediante Context API.

Búsqueda y filtrado de héroes por nombre o editorial (Marvel, DC).

Persistencia de la última ruta visitada en localStorage para mejorar la experiencia de usuario.

Tecnologías principales:
React 18+

React Router DOM

Context API

Bootstrap 5

Estructura:
PublicLayout: para rutas accesibles sin autenticación.

PrivateLayout: para rutas protegidas, accesibles solo si el usuario ha iniciado sesión.

AuthContext: administra el estado de autenticación del usuario.

HeroesPages: vistas principales de héroes y detalles individuales.
