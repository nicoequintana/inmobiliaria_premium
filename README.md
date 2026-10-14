# Garcia Boillos Propiedades — Demo

Sitio web de demostración para una inmobiliaria de CABA y zona norte: catálogo de propiedades en dólares con filtros, galería de fotos y contacto directo por WhatsApp o email.

> **Esto es una demo.** Todas las propiedades, precios, superficies e imágenes son ficticios, y el número de WhatsApp y el correo de contacto no existen. El sitio no tiene backend, formularios, cuentas ni pagos. Un cartel "Demo · datos ficticios" se muestra en el pie de todas las páginas.

---

## Qué podés hacer en la demo

| Página | Ruta | Qué muestra |
|---|---|---|
| Inicio | `/` | Portada, buscador rápido, propiedades destacadas, beneficios y contacto |
| Catálogo | `/propiedades` | Las 15 propiedades con filtros combinables |
| Detalle | `/propiedades/:id` | Galería, ficha técnica, descripción y botones de contacto |
| No encontrado | cualquier otra | Página 404 con salida al catálogo |

### Recorrido sugerido

1. **Entrá al inicio** y usá el buscador flotante (zona, tipo de propiedad y precio máximo). Al tocar *Buscar* te lleva al catálogo con esos filtros ya aplicados.
2. **Mirá las destacadas** en el carrusel (8 propiedades). En pantallas grandes se paginan de a 4, en tablet de a 2 y en celular de a 1.
3. **Filtrá el catálogo** por texto, tipo, zona, ambientes mínimos y precio máximo. Los resultados se actualizan solos y el contador te dice cuántas propiedades coinciden.
4. **Abrí una propiedad** para ver la galería (miniaturas, flechas y contador de fotos), la ficha y la descripción.
5. **Probá el contacto**: *Escribir por WhatsApp* abre un chat con el mensaje ya redactado (incluye el código de la propiedad) y *Enviar un email* abre tu cliente de correo con asunto y cuerpo completos. Como los datos son ficticios, el mensaje no llega a nadie.

---

## Cómo funciona

### Filtros y URL compartible

Los filtros del catálogo viven en la dirección del navegador (`/propiedades?tipo=casa&zona=Belgrano&precioMax=300000`). Eso permite:

- **Compartir un enlace** con los resultados ya filtrados.
- **Usar el botón "atrás"** del navegador para volver al filtro anterior.
- Que la URL solo lleve lo que cambiaste: los valores por defecto (por ejemplo, "sin límite de precio") no aparecen.

Reglas de filtrado:

- Los filtros se combinan con **Y**: una propiedad tiene que cumplirlos todos.
- **Buscar** mira el título, la zona y la descripción, y no distingue mayúsculas ni tildes (`cordoba` encuentra `Córdoba`).
- **Ambientes** funciona como mínimo ("3 o más").
- **Precio máximo** va de USD 100.000 a USD 600.000 en saltos de 10.000. Al llegar al tope significa "sin límite".
- Al escribir en el buscador, el filtro se aplica tras una breve pausa (350 ms) para no llenar el historial con cada letra.
- Si ninguna propiedad coincide, aparece un estado vacío con la opción de limpiar los filtros.

### Precios

Todo está en dólares estadounidenses (USD). Las ventas muestran el precio total (`USD 185.000`) y los alquileres el valor mensual (`USD 1.200 / mes`).

### Favoritos

Cada tarjeta tiene un corazón para marcar favoritos. En esta demo **solo funciona mientras la página está abierta**: no se guarda y se pierde al recargar.

### Datos de la demo

El catálogo está escrito a mano en [`src/data/listings.js`](src/data/listings.js). No hay base de datos ni llamadas a un servidor.

- **15 propiedades**: 9 en venta y 6 en alquiler.
- **5 tipos**: departamento (6), casa (3), PH (2), quinta (2) y local comercial (2).
- **9 zonas**: Palermo, Belgrano, Recoleta, Caballito, Villa Crespo, San Telmo, Tigre, San Isidro y Vicente López.
- **8 destacadas**, que son las que aparecen en el carrusel de inicio.

### Diseño y experiencia

- **Estilo**: tema oscuro con detalles dorados, tipografía serif para títulos (Cormorant Garamond) y sans para el texto (Manrope).
- **Responsive**: se adapta a celular, tablet y escritorio (cortes en 640, 1024 y 1280 px). En celular el carrusel muestra un contador "1 / 8", los filtros del catálogo se pliegan detrás de un botón y el menú se compacta al hacer scroll.
- **Accesibilidad**: enlace para saltar al contenido, foco de teclado visible, botones y enlaces de al menos 44 × 44 px, y etiquetas descriptivas en los controles.
- **Animaciones**: entradas suaves en el catálogo. Si tu sistema tiene activada la opción de **reducir movimiento**, se desactivan.

---

## Cómo correrlo en tu computadora

Necesitás [Node.js](https://nodejs.org) 18 o superior.

```bash
git clone https://github.com/nicoequintana/inmobiliaria_premium.git
cd inmobiliaria_premium
npm install
npm run dev
```

Abrí la dirección que muestra la terminal (normalmente `http://localhost:5173`).

| Comando | Para qué sirve |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve esa versión en `http://localhost:4173` |

> **Necesita conexión a internet.** Las fotos se cargan desde Unsplash y las tipografías desde Google Fonts. Sin conexión el sitio funciona, pero verás fondos oscuros en lugar de fotos y tipografías de reemplazo.

---

## Tecnologías

- [React 18](https://react.dev) y [React Router 6](https://reactrouter.com) para la interfaz y la navegación.
- [Vite 6](https://vitejs.dev) como herramienta de desarrollo y compilación.
- [Sass](https://sass-lang.com) (SCSS) con tokens de color, espacio y tipografía.
- [Anime.js 4](https://animejs.com) para las animaciones del catálogo.

## Estructura del proyecto

```
src/
├── components/   Piezas de interfaz (home, filtros, listados, layout, ui)
├── data/         Catálogo ficticio de propiedades (listings.js)
├── lib/          Lógica de filtros y control de animaciones
├── routes/       Una página por ruta (Inicio, Catálogo, Detalle, 404)
└── styles/       SCSS organizado por capas (tokens, base, layout, components, pages)
```

Cada página se carga bajo demanda (*code splitting*), así que la primera visita descarga solo lo necesario.

---

## Personalizarlo

- **Propiedades**: editá `src/data/listings.js`. Cada una tiene `id`, título, zona, tipo, operación (`venta` o `alquiler`), precio en USD, ambientes, baños, superficie, descripción y si es destacada.
- **Contacto**: cambiá el número y el correo en `src/components/listings/detail/ContactCTA.jsx` (objeto `CONTACT`).
- **Colores, espacios y tipografía**: están en `src/styles/tokens/`.

## Publicarlo

`npm run build` genera una carpeta `dist/` con archivos estáticos que podés subir a cualquier hosting (Netlify, Vercel, GitHub Pages, etc.). Como el sitio usa rutas del navegador (`/propiedades/...`), el hosting tiene que redirigir todas las rutas a `index.html`; si no, al recargar una página interna aparece un error 404 del servidor.

## Qué no incluye (a propósito)

Es una demo de interfaz, así que no tiene: base de datos ni panel de administración, formularios de contacto, registro de usuarios, favoritos guardados, pagos ni mapa. Todo el contacto se resuelve con enlaces a WhatsApp y email.

## Créditos

- Fotografías: [Unsplash](https://unsplash.com), usadas como imágenes de muestra.
- Tipografías: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) y [Manrope](https://fonts.google.com/specimen/Manrope), vía Google Fonts.
