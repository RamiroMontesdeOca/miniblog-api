# Miniblog API

API REST para gestionar autores y posts de un blog. Permite operaciones CRUD completas sobre autores y publicaciones, con relación de clave foránea entre posts y autores.

Proyecto construido con Node.js, Express y PostgreSQL.


## URL Base

`<URL_DE_RAILWAY>` (por ejemplo, `https://miniblog-api-production.up.railway.app`)

En desarrollo local: `http://localhost:3000`

## Tecnologías

- **Backend:** Node.js con Express 5
- **Base de datos:** PostgreSQL
- **Cliente DB:** pg (node-postgres)
- **Documentación:** OpenAPI 3.1 con Swagger UI
- **Tests:** Vitest + Supertest
- **Deployment:** Railway

## Endpoints

### Autores

- `GET /authors` - Obtener todos los autores
- `GET /authors/:id` - Obtener un autor específico
- `POST /authors` - Crear un nuevo autor
- `PUT /authors/:id` - Actualizar un autor existente
- `DELETE /authors/:id` - Eliminar un autor

### Posts

- `GET /posts` - Obtener todos los posts
- `GET /posts/:id` - Obtener un post específico
- `GET /posts/author/:authorId` - Obtener posts de un autor (con datos del autor incluidos)
- `POST /posts` - Crear un nuevo post
- `PUT /posts/:id` - Actualizar un post existente
- `DELETE /posts/:id` - Eliminar un post

Documentación completa e interactiva de cada endpoint (parámetros, schemas, códigos de error) disponible en `/api-docs`.

## Ejemplos de Uso

### Obtener todos los autores

```bash
curl http://localhost:3000/authors
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "nombre": "Ana García",
    "email": "ana@example.com",
    "bio": "Desarrolladora full-stack apasionada por Node.js",
    "creado": "2026-09-23T04:50:00.000Z"
  },
  {
    "id": 2,
    "nombre": "Carlos Ruiz",
    "email": "carlos@example.com",
    "bio": "Escritor técnico especializado en bases de datos",
    "creado": "2026-09-23T04:50:00.000Z"
  }
]
```

### Obtener un autor específico

```bash
curl http://localhost:3000/authors/1
```

**Respuesta:**

```json
{
  "id": 1,
  "nombre": "Ana García",
  "email": "ana@example.com",
  "bio": "Desarrolladora full-stack apasionada por Node.js",
  "creado": "2026-09-23T04:50:00.000Z"
}
```

### Crear un nuevo autor

```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María Rodríguez",
    "email": "maria.rodriguez@example.com",
    "bio": "Ingeniera de software especializada en APIs"
  }'
```

**Respuesta:**

```json
{
  "id": 4,
  "nombre": "María Rodríguez",
  "email": "maria.rodriguez@example.com",
  "bio": "Ingeniera de software especializada en APIs",
  "creado": "2026-09-23T05:00:00.000Z"
}
```

### Actualizar un autor

```bash
curl -X PUT http://localhost:3000/authors/4 \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "Ingeniera de software y speaker internacional"
  }'
```

**Respuesta:**

```json
{
  "id": 4,
  "nombre": "María Rodríguez",
  "email": "maria.rodriguez@example.com",
  "bio": "Ingeniera de software y speaker internacional",
  "creado": "2026-09-23T05:00:00.000Z"
}
```

### Eliminar un autor

```bash
curl -X DELETE http://localhost:3000/authors/4
```

Responde `204 No Content` sin body.

### Obtener todos los posts

```bash
curl http://localhost:3000/posts
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "titulo": "Introducción a Node.js",
    "contenido": "Node.js es un runtime de JavaScript...",
    "autores_id": 1,
    "published": true,
    "creado": "2026-09-23T04:50:00.000Z"
  }
]
```

### Crear un post

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Introducción a PostgreSQL",
    "contenido": "PostgreSQL es una base de datos relacional de código abierto...",
    "author_id": 1,
    "published": true
  }'
```

**Respuesta:**

```json
{
  "id": 6,
  "titulo": "Introducción a PostgreSQL",
  "contenido": "PostgreSQL es una base de datos relacional de código abierto...",
  "autores_id": 1,
  "published": true,
  "creado": "2026-09-23T05:10:00.000Z"
}
```

> Nota: el body de creación usa `author_id`, pero la respuesta devuelve `autores_id` (nombre real de la columna en la base de datos).

### Obtener posts de un autor específico

```bash
curl http://localhost:3000/posts/author/1
```

**Respuesta:**

```json
[
  {
    "post_id": 1,
    "post_titulo": "Introducción a Node.js",
    "contenido": "Node.js es un runtime de JavaScript...",
    "post_published": true,
    "post_creado": "2026-09-23T04:50:00.000Z",
    "author_id": 1,
    "author_nombre": "Ana García",
    "author_email": "ana@example.com",
    "bio": "Desarrolladora full-stack apasionada por Node.js"
  }
]
```

> Nota: este endpoint devuelve una forma de respuesta distinta a los demás (columnas aplanadas de un JOIN con `authors`), ya que incluye los datos del autor junto con cada post.

## Documentación Completa

La documentación interactiva completa de la API está disponible en:

**`<URL_DE_RAILWAY>/api-docs`** (o `http://localhost:3000/api-docs` en desarrollo local)

Ahí podés:
- Ver todos los endpoints con detalles completos
- Probar endpoints directamente desde el navegador
- Ver los schemas de datos y ejemplos
- Entender parámetros opcionales y requeridos, y los posibles códigos de error (400, 404, 409, 500)

## Ejecutar Localmente

### Prerrequisitos

- Node.js 20 o superior
- PostgreSQL 14 o superior

### Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/RamiroMontesdeOca/miniblog-api.git
cd miniblog-api
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

Crea un archivo `.env` en la raíz del proyecto (podés basarte en `.env.example`):

```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/miniblog_db
PORT=3000
```

4. Configurar la base de datos:

```bash
# Crear la base de datos
psql -U postgres -c "CREATE DATABASE miniblog_db;"

# Crear las tablas
psql -U postgres -d miniblog_db -f db/setup.sql

# Cargar datos de ejemplo (opcional)
psql -U postgres -d miniblog_db -f db/seed.sql
```

5. Iniciar el servidor:

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`, y la documentación en `http://localhost:3000/api-docs`.

### Correr los tests

```bash
npm test
```

Requiere una variable `TEST_DATABASE_URL` configurada en `.env`, apuntando a una base de datos separada para testing.
