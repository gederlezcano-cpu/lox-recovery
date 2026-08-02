# LOX Recovery — Maqueta Web

Sitio estático (HTML + CSS + JS, sin frameworks ni build step) para pruebas online vía **GitHub Pages**. Construido a partir del Brand Book y del "Website Development Dossier" del cliente.

## Estructura

```
lox-web/
├─ index.html          Home
├─ metodo-lox.html      O Método LOX
├─ servicos.html        Serviços (3 modalidades + comparativo)
├─ avaliacao.html       Avaliação Corporal Gratuita (formulário)
├─ sobre.html           Sobre
├─ blog.html            Blog / centro de conhecimento (categorías, sin artículos aún)
├─ contato.html         Contato (mapa + formulário)
├─ privacidade.html     Política de Privacidade (placeholder — ver abajo)
├─ 404.html
├─ assets/
│  ├─ css/style.css     Design system (colores, tipografía, componentes)
│  ├─ js/main.js        Nav, menú móvil, FAQ, animaciones, formularios → WhatsApp
│  └─ img/              Logo e imágenes de marca
├─ robots.txt
└─ sitemap.xml
```

## Previsualizar en local

No requiere instalación. Dos opciones:

1. **Abrir directo**: doble clic en `index.html` (funciona, salvo el iframe del mapa que algunos navegadores bloquean sobre `file://`).
2. **Servidor local** (recomendado, igual que producción):
   ```bash
   py -3 -m http.server 5500
   ```
   y abrir `http://localhost:5500`.

## Estado de los pendientes

- ✅ **WhatsApp**: número real cargado en [`assets/js/main.js`](assets/js/main.js) (`LOX_WHATSAPP_NUMBER`).
- ✅ **Instagram**: enlazado a [instagram.com/loxrecovery](https://www.instagram.com/loxrecovery/) en header, footer y contato.
- ⏸️ **Google Business**: queda como placeholder (`#`) a pedido del cliente — no es necesario por ahora.
- ⏸️ **Política de Privacidad**: `privacidade.html` sigue siendo un placeholder (se omite de momento). El texto legal final (conforme LGPD) deberá redactarse antes de publicar en producción.
- ⚠️ **Fotografía**: los fondos de hero (`assets/img/hero-*.jpg`) son piezas de Instagram con texto de marca incrustado; el overlay oscuro los atenúa pero no los elimina del todo. Para producción se recomienda pedir al fotógrafo tomas limpias (sin texto) para los heroes.
- ℹ️ **Formularios**: al no haber backend en GitHub Pages, cada formulario arma un mensaje de WhatsApp prellenado con los datos ingresados (tal como pide el dossier, sección "Integração WhatsApp") y lo abre en `wa.me`. No hay integración real con CRM — eso requeriría backend/automatización aparte cuando se pase a un hosting definitivo.

## Publicar en GitHub Pages

```bash
# dentro de esta carpeta (lox-web)
git init
git add .
git commit -m "Maqueta inicial LOX Recovery"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

Luego en GitHub: **Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / `root`**. El sitio queda publicado en `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.

Actualizar `robots.txt` y `sitemap.xml` con esa URL real una vez tengas el nombre definitivo del repositorio.

## Notas de diseño

- Mobile-first, siguiendo el "Documento de Experiencia Digital": máximo 6 ítems de menú, botón de WhatsApp siempre visible, animaciones discretas (fade/slide), sin carruseles.
- Paleta: Negro Carbón `#121212`, Blanco Puro `#FFFFFF`, Verde Kinetix `#00F5A0` (nunca como color dominante).
- Tipografía: Montserrat (Google Fonts) — Extra Bold en títulos, Regular/Light en cuerpo.
- Las 3 tarjetas de servicios en `servicos.html` usan las piezas oficiales de precios del brand kit (`servico-*.png`) tal cual, para fidelidad pixel-perfect de marca.
