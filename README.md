# Implementación de Consultas Seguras y Asíncronas

Aplicación Node.js que ejecuta consultas asíncronas en PostgreSQL utilizando `async/await`, callbacks y consultas parametrizadas para evitar **SQL Injection**.

---

## 📁 Estructura del Proyecto

```
├── config/
│   └── db.js          # Configuración del Pool de conexiones a PostgreSQL
├── index.js           # Aplicación principal
├── package.json       # Dependencias del proyecto
└── README.md
```

---

## 🐛 Bugs Corregidos

Se identificaron y corrigieron **2 errores** en `index.js`:

### Bug #1 — Ruta de importación incorrecta

```js
// ❌ ANTES (incorrecto):
const pool = require('./pool');

// ✅ DESPUÉS (correcto):
const pool = require('./config/db');
```

### Bug #2 — Auto-referencia antes de declaración

```js
// ❌ ANTES (incorrecto — 'cliente' no existe aún, causa ReferenceError):
const cliente = await cliente.connect();

// ✅ DESPUÉS (correcto — se obtiene el cliente desde el pool):
const cliente = await pool.connect();
```

---

## 🚀 Instalación y Uso

1. Instalar dependencias:
```bash
npm install
```

2. Configurar las credenciales en `config/db.js`:
```js
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'mi_base_de_datos',
    user: 'mi_usuario',
    password: 'mi_contraseña',
});
```

3. Ejecutar la aplicación:
```bash
node index.js
```

---

## 📚 Conceptos Clave Implementados

### Pool de Conexiones
Gestiona múltiples conexiones reutilizables, evitando abrir y cerrar una conexión por cada consulta.

```js
const { Pool } = require('pg');
const pool = new Pool({ /* config */ });
```

### Consulta con Callback
```js
pool.query('SELECT * FROM usuarios', (error, resultados) => {
    if (error) return console.error(error.message);
    console.table(resultados.rows);
});
```

### Consulta con Async/Await + try...catch
```js
const cliente = await pool.connect();
try {
    const resultado = await cliente.query(query, values);
    console.table(resultado.rows);
} catch (error) {
    console.error(error.message);
} finally {
    cliente.release(); // siempre liberar la conexión
}
```

### Consulta Parametrizada — Anti SQL Injection
```js
// ❌ INSEGURO — permite SQL Injection:
pool.query(`SELECT * FROM usuarios WHERE id = ${id}`);

// ✅ SEGURO — PostgreSQL trata $1 como dato, no como código:
const query = 'SELECT * FROM usuarios WHERE id = $1';
const values = [id];
await cliente.query(query, values);
```

---

## 📦 Dependencias

| Paquete | Uso |
|---------|-----|
| `pg` | Cliente PostgreSQL para Node.js |
| `express` | Servidor HTTP |
| `dotenv` | Variables de entorno |
| `bcryptjs` | Hash de contraseñas |
| `jsonwebtoken` | Autenticación JWT |
| `multer` | Manejo de archivos |
| `nodemon` | Reinicio automático en desarrollo |

---

## ✍️ Autor

**Sabina Romero** — Proyecto educativo Node.js / PostgreSQL