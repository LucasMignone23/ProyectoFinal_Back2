# Backend Ecommerce - Entrega Final

## Descripción

API backend para un ecommerce con Node.js, Express y MongoDB.
Implementa:

- Patrón DAO, DTO y Repository.
- Autenticación con Passport (Local & JWT).
- Roles de usuario: admin y user.
- CRUD de productos (solo admin).
- Gestión de carrito (solo user): crear, ver, agregar producto, eliminar, finalizar compra.
- Modelo Ticket con stock check y generación de ticket.
- Servicio de mailing tras compra.
- Variables de entorno con `.env`.

## Endpoints

- **Auth**POST `/api/sessions/register`
- POST `/api/sessions/login`
- GET  `/api/sessions/current`
- **Products (admin)**
- GET `/api/products `
- GET `/api/products/:pid `
- POST `/api/products`
- PUT `/api/products/:pid`
- DELETE `/api/products/:pid`
- **Cart (user)**
- POST `/api/carts`
- GET `/api/carts/:cid`
- POST `/api/carts/:cid/product/:pid`
- DELETE `/api/carts/:cid/product/:pid`
- POST `/api/carts/:cid/purchase`
