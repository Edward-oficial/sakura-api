<div align="center"><h1>Sakura API</h1>
<p><b>Rápida · Moderna · Escalable</b></p><br><a href="#"><img src="https://img.shields.io/badge/INICIAR_SESIÓN-111111?style=for-the-badge"></a>
<a href="#"><img src="https://img.shields.io/badge/REGISTRARSE-c69a4a?style=for-the-badge"></a>
<a href="#"><img src="https://img.shields.io/badge/DOCUMENTACIÓN-2a2a2a?style=for-the-badge"></a>

<br><br>

<img src="https://upload.wikimedia.org/wikipedia/en/7/7d/Sakura_Haruno.png" width="160" /><br><br>

<img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge">
<img src="https://img.shields.io/badge/Express-Framework-000000?style=for-the-badge">
<img src="https://img.shields.io/badge/hCaptcha-Security-c69a4a?style=for-the-badge"></div>---

¿Qué es Sakura API?

Sakura API es una API privada enfocada en seguridad, control y escalabilidad.
Todo acceso está protegido mediante autenticación obligatoria, asegurando que cada request provenga de un usuario válido.

Cada usuario obtiene su propia API Key, con límites de uso mensuales para mantener estabilidad y rendimiento.

La arquitectura modular permite agregar nuevas funcionalidades sin afectar el sistema existente.

---

Características

- Autenticación obligatoria
- API Key única por usuario
- Control de uso mensual
- Protección con hCaptcha
- Sistema modular escalable
- Optimización de rendimiento

---

Uso

1. Crear cuenta o iniciar sesión
2. Obtener API Key
3. Consumir endpoints

GET /search/ytsearch?q=daddy+yankee&apikey=TU_API_KEY

También mediante headers:

x-api-key: TU_API_KEY

---

Endpoints

Categoría| Endpoint| Descripción
Sistema| "GET /ejemplo/ping"| Estado del servidor
Search| "GET /search/ytsearch?q="| Búsqueda en YouTube

---

Arquitectura

/endpoints
   /search
   /system
   /future

---

Equipo

<div align="center">Rol| Nombre
Desarrollador| Duan Edward
Desarrollador| Matterssmith
Desarrollador| AmilcarGit
Desarrollador| Night Vibe

</div>---