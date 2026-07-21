<div align="center">

![banner](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Sakura%20API&fontSize=60&fontColor=f3e8d7&animation=fadeIn&fontAlignY=38&desc=Rápida%20·%20Moderna%20·%20Optimizada&descAlignY=58&descSize=18)

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Shippori+Mincho&size=24&duration=3000&pause=800&color=C69A4A&center=true&vCenter=true&width=600&lines=Tu+API+con+login+forzoso;Endpoints+organizados+por+categor%C3%ADas;Segura%2C+ligera+y+lista+para+crecer)](https://git.io/typing-svg)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![hCaptcha](https://img.shields.io/badge/hCaptcha-Protected-c69a4a?style=for-the-badge)

</div>

---

## 🌸 ¿Qué es Sakura API?

Sakura API es una API propia con **acceso protegido por login y registro**: nadie puede usar los endpoints ni ver el contenido sin antes crear una cuenta. Cada usuario recibe su propia **API Key**, con un límite de solicitudes mensual, para poder consumir los servicios de forma controlada.

Está pensada para crecer: cada categoría de endpoints vive de forma independiente, así que sumar servicios nuevos no rompe los que ya existen.

---

## ✨ Características

- 🔐 **Login y registro forzoso** — sin sesión, no hay acceso.
- 🔑 **API Key personal** con límite de solicitudes mensual por usuario.
- 🤖 **hCaptcha** en login y registro para frenar cuentas automatizadas.
- 🧩 **Categorías independientes** de endpoints, fáciles de ampliar.
- 🎨 Interfaz propia con tema oscuro y acentos dorados.

---

## 🔑 Cómo se usa

1. Crea una cuenta en **Registro** o inicia sesión.
2. Copia tu **API Key** personal.
3. Agrégala a cualquier endpoint como `?apikey=` (o en el header `x-api-key`).

```
GET /search/ytsearch?q=daddy+yankee&apikey=TU_API_KEY
```

---

## 📚 Categorías disponibles

| Categoría | Endpoint | Para qué sirve |
|---|---|---|
| 🧪 Ejemplo | `GET /ejemplo/ping` | Verifica que el servidor está vivo |
| 🔎 Search | `GET /search/ytsearch?q=` | Busca videos en YouTube por texto |

---

## 👥 Créditos

<div align="center">

| Rol | Nombre |
|---|---|
| Creador / Desarrollador | **Edward** |
| Colaborador | **Matterssmith** |
| Colaborador | **AmilcarGit** |
| Colaborador | **Night Vibe** |

</div>

---

<div align="center">

![banner](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer)

</div>
