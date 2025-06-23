# Documentación Rápida del Proyecto "artesana"

## Descripción
Aplicación web de catálogo y menú para una cafetería llamada "El Hada Artesana". Permite a los usuarios ver productos, categorías, y cuenta con páginas de registro e inicio de sesión.

## Estructura de Carpetas

- **public/**  
  Archivos estáticos accesibles públicamente (imágenes, íconos, logos).

- **src/**  
  Código fuente principal de la aplicación.
  - **assets/**  
    Imágenes y recursos gráficos usados en la app.
  - **components/**  
    Componentes reutilizables:
    - **Header/**: Barra de navegación superior.
    - **Footer/**: Pie de página.
    - **ProductCard/**: (Pendiente de implementación) Componente para mostrar productos individuales.
  - **pages/**  
    Vistas principales de la app:
    - **Home/**: Página de inicio.
    - **Catalog/**: Catálogo de productos y categorías.
    - **Login/**: Página de inicio de sesión.
    - **Register/**: Página de registro de usuario.
  - **styles/**  
    Archivos SCSS globales y utilitarios.
    - **base/**: Variables, mixins y estilos globales.

- **index.html**  
  HTML principal donde se monta la app React.

- **package.json**  
  Dependencias y scripts del proyecto.

- **vite.config.js**  
  Configuración de Vite para desarrollo y build.

- **eslint.config.js**  
  Configuración de ESLint para mantener calidad de código.

## Principales Tecnologías

- **React 19**  
- **React Router DOM 7**  
- **Sass (SCSS)**  
- **Vite**  
- **ESLint**

## Páginas y Componentes Clave

- `src/App.jsx`: Define las rutas principales.
- `src/pages/Home/Home.jsx`: Página de bienvenida.
- `src/pages/Catalog/Catalog.jsx`: Muestra categorías y productos.
- `src/pages/Login/Login.jsx`: Formulario de inicio de sesión.
- `src/pages/Register/Register.jsx`: Formulario de registro.
- `src/components/Header/Header.jsx`: Navegación fija superior.
- `src/components/Footer/Footer.jsx`: Pie de página.

## Estilos

- Variables y mixins centralizados en `src/styles/base`.
- Cada página y componente tiene su propio archivo SCSS.

---
