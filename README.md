
# publicationfb

Esta es una aplicación Node.js que utiliza los servicios de Facebook para realizar publicaciones automáticas.

## Requisitos

- Node.js v18 o superior.
- Una cuenta de desarrollador de Facebook con acceso a la API de Facebook.

## Instalación

1. **Clona el repositorio en tu máquina local:**

```bash
git clone git@github.com:AndyKingche/publicationfb.git
```

2. **Ingresa al directorio del proyecto**

```bash
cd publicationfb
```

3. **Instala las dependencias con npm:**
    
```bash
npm install
```

## Configuración

Antes de ejecutar la aplicación, asegúrate de configurar las credenciales de acceso a la API de Facebook creando el archivo .env.

Este es un ejemplo de como debe quedar.

```env
ACCESS_TOKEN=tu_acces_token_que_nunca_se_caduca
ACCESS_TOKEN_MAIN=tu_acces_token_principal
APP_SECRET=la_clave_de_accesso_bussines_profile
PAGE_ID=id_de_tu_pagina_facebook
SYSTEM_USER_ID=id_usuario_del_sistema
BUSSINES_ID=id_de_tu_aplicacion
```
> 💡 **Consejo:** Utiliza variables de entorno para mantener tus credenciales seguras.


## Ejecución

Puedes ejecutar la aplicación con el siguiente comando

```bash
npm run publish-facebook
```

O, si prefieres, puedes usar el comando directo de Node.js:

```bash
node index.js
```

Para más información de como usar el api de facebook debes dirigirte al siguiente enlace.

- [Api-Facebook](https://developers.facebook.com/docs/pages-api/posts?locale=es_LA)