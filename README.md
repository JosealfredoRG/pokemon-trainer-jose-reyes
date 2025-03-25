
# Desafío Pokémon 

Prueba técnica para el puesto de Front End Developer.

Esta aplicación, desarrollada con Angular, permite al usuario registrarse como entrenador Pokémon, seleccionar sus 3 Pokémon iniciales de la primera generación y visualizar sus estadísticas.


---

## 🚀 Instrucciones para ejecutar el proyecto

### ✅ Requisitos

- Node.js v18.x
- Angular CLI
- Docker (opcional, para entorno de producción)

---

### demo
https://ornate-concha-f17fc8.netlify.app/profile


### 🧪 Modo Desarrollo (local)

1. **Instalar dependencias**:

   ``` bash
   npm install --legacy-peer-deps
   ``` 
   
2. **Ejecutar el Proyecto**:

   ``` bash
	ng serve
   ``` 


### 🧪 Instalación con Docker
1. **Crear imagen de Docker**:

   ``` bash
   docker build -t desafio-pokemon .
   ``` 
2. **Ejecutar la imagen de docker**:

   ``` bash
	docker run -p 8087:80 -it desafio-pokemon
   ``` 

2. **Abrir en el navegador**:

   ``` bash
	ir a la ruta: http://localhost:8087
   ``` 