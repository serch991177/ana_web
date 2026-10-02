# Para Ana · Feliz cumpleaños

Página de cumpleaños creada con **Angular 21**, componentes standalone, TypeScript y CSS. El diseño se adapta a móvil, tablet y escritorio. Las imágenes, los iconos y las fuentes están incluidos en el proyecto.

## Ejecutar en Windows, macOS o Linux

1. Instala **Node.js 24 LTS** desde https://nodejs.org/ si todavía no lo tienes.
2. Descomprime el ZIP.
3. Abre una terminal en la carpeta `ana-cumpleanos`, donde está `package.json`.
4. Ejecuta:

```bash
npm ci
npm start
```

5. Abre **http://localhost:4200** en tu navegador.

No necesitas instalar Angular CLI globalmente. `npm start` utiliza la versión incluida en el proyecto. La primera instalación necesita conexión a internet para descargar las dependencias; las imágenes y fuentes de la página se sirven localmente.

## Qué incluye

- Felicitación para Ana y fecha del 2 de octubre.
- Fotografía original de rosas y lirios.
- Carta personal con un tono cariñoso y ligero, pensada para dos personas que recién se están conociendo.
- Cuenta regresiva con fecha de Bolivia y estados para antes, durante y después del cumpleaños.
- Seis cupones: **Cocolatte, La Chocolatería, Matilda, películas de terror, matambre a la pizza y un paseo con perritos**.
- Filtros de cupones y detalles de cada invitación.
- Botón para copiar un mensaje y coordinar el plan por chat. Si el navegador no permite copiar, muestra el mensaje para seleccionarlo manualmente.
- Fotografía original de un perrito en una cafetería.
- Sección de música favorita: **«You» de Romeo Santos**, con reproductor de YouTube que se carga al abrirlo y un enlace para escuchar el video en otra pestaña. La música comienza cuando pulsas play.
- Un deseo de cumpleaños con confeti, que respeta la preferencia de movimiento reducido del dispositivo.
- Menú móvil y cuadros de diálogo que se pueden cerrar con Escape, la cruz o un clic fuera.

Los cupones son **invitaciones personales de Sergio para Ana**, no promociones oficiales de las cafeterías. Copiar un mensaje no lo envía ni realiza una reserva.

## Personalizar

Edita **`src/app/birthday.config.ts`**. Ahí están:

- `recipient`: nombre de quien cumple años.
- `sender`: tu nombre.
- `birthday` y `birthdayEnd`: inicio y fin del cumpleaños. La versión entregada usa el **2 de octubre de 2026**, de medianoche a medianoche en Bolivia (`-04:00`).
- `dateLabel`: fecha escrita en la página.
- `letter`: los párrafos de la carta.
- `music`: título, artista, ID del video y enlace de YouTube de la canción favorita.
- `coupons`: nombres, mensajes y planes.

Si cambias la fecha o el nombre para reutilizar el proyecto, actualiza también el título, la descripción de `src/index.html` y los textos decorativos de fecha en `src/app/app.component.html`.

Para el diseño:

| Archivo | Qué cambiar |
| --- | --- |
| `src/styles.css` | Colores principales y fuentes |
| `src/app/app.component.css` | Tamaños, espacios, cupones y adaptación a pantalla |
| `src/app/app.component.html` | Textos y estructura de la página |
| `public/assets/images/rosas-lirios.webp` | Imagen principal |
| `public/assets/images/perrito-cafe.webp` | Foto del perrito |

No se necesita backend, base de datos, autenticación ni claves de servicios externos.

La sección musical requiere conexión a internet para reproducir el video de YouTube. Si el reproductor no está disponible en tu navegador, puedes usar **Escuchar en YouTube**. Cerrar el reproductor retira el video de la página y detiene su reproducción.

## Compilar

```bash
npm run build
```

Para alojarla dentro de una subcarpeta o usar los archivos compilados con rutas relativas:

```bash
npm run build:relative
```

El resultado queda en **`dist/ana-cumpleanos/browser`**. El ZIP incluye esa carpeta ya compilada con rutas relativas. Puedes subir su contenido a un alojamiento estático.

### Ver la versión compilada sin instalar Angular

Si tienes Python instalado:

```bash
cd dist/ana-cumpleanos/browser
python -m http.server 8080
```

Abre **http://localhost:8080**. Usa un servidor HTTP; no abras `index.html` con doble clic, porque los módulos de JavaScript necesitan servirse por HTTP.

## Estructura

```text
ana-cumpleanos/
  public/
    assets/images/
    assets/icons.svg
    favicon.svg
  src/
    assets/fonts/
    app/
      birthday.config.ts
      app.component.ts
      app.component.html
      app.component.css
      icon.component.ts
    main.ts
    styles.css
    index.html
  dist/ana-cumpleanos/browser/
  licenses/
  angular.json
  package.json
  package-lock.json
  README.md
```

Las dependencias de `node_modules` y la caché de Angular no se incluyen en el ZIP. `npm ci` las reconstruye desde el lockfile.

## Recursos y licencias

Las fotografías fueron generadas específicamente para esta página y no representan locales reales. Los iconos son de Lucide; las fuentes son Manrope y Cormorant Garamond. Sus licencias están en `licenses/`. La compilación también conserva los avisos de las dependencias en `dist/ana-cumpleanos/3rdpartylicenses.txt`.
