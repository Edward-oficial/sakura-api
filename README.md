<div align="center">  







</div>  
---

🌸 ¿Qué es Sakura API?

Sakura API es una API propia con acceso protegido por login y registro: nadie puede usar los endpoints ni ver el contenido sin antes crear una cuenta. Cada usuario recibe su propia API Key, con un límite de solicitudes mensual, para poder consumir los servicios de forma controlada.

Está pensada para crecer: cada categoría de endpoints vive de forma independiente, así que sumar servicios nuevos no rompe los que ya existen.


---

✨ Características

🔐 Login y registro forzoso — sin sesión, no hay acceso.

🔑 API Key personal con límite de solicitudes mensual por usuario.

🤖 hCaptcha en login y registro para frenar cuentas automatizadas.

🧩 Categorías independientes de endpoints, fáciles de ampliar.

🎨 Interfaz propia con tema oscuro y acentos dorados.



---

🔑 Cómo se usa

1. Crea una cuenta en Registro o inicia sesión.


2. Copia tu API Key personal.


3. Agrégala a cualquier endpoint como ?apikey= (o en el header x-api-key).



GET /search/ytsearch?q=daddy+yankee&apikey=TU_API_KEY


---

📚 Categorías disponibles

Categoría	Endpoint	Para qué sirve

🧪 Ejemplo	GET /ejemplo/ping	Verifica que el servidor está vivo
🔎 Search	GET /search/ytsearch?q=	Busca videos en YouTube por texto



---

👥 Créditos

<div align="center">  Creadores

Desarrollador   Edward
Desarrolladora  Matterssmith
Desarrollador	   AmilcarGit
Desarrollador	   Night Vibe


</div>  
---

<div align="center">  

</div>  