# Dokumentasi API Product Management

## Gambaran Umum
API ini menyediakan endpoints untuk mengelola **product brands** dan **catalogs** dengan operasi **CRUD** (Create, Read, Update, Delete). Dibangun dengan **ExpressJS** dan **Prisma** sebagai ORM.

## Persyaratan
- **Node.js** (v14 atau lebih baru)
- **MySQL database**
- **Prisma CLI** (terinstal secara global atau lokal)

## Instalasi

### Clone repositori
bash git clone [repo-url] cd [repo-name]
javascript



### Install dependencies
bash npm install
javascript



### Setup database
1. Buat database MySQL.
2. Konfigurasi koneksi database di `.env`:
DATABASE_URL="mysql://user:password@localhost:3306/database_name"
javascript



### Jalankan migrasi
bash npx prisma migrate dev
javascript



### Jalankan server
bash node index.js
javascript



## Endpoints API

### Product Brands

#### Get All Brands
- **URL**: `/brands`
- **Method**: `GET`
- **Response**:
json [ { "id": 1, "brand_name": "Samsung", "created_at": "2023-05-26T10:00:00.000Z", "updated_at": "2023-05-26T10:00:00.000Z" } ]

#### Get Single Brand
- **URL**: `/brands/:id`
- **Method**: `GET`
- **Response**:
json { "id": 1, "brand_name": "Samsung", "created_at": "2023-05-26T10:00:00.000Z", "updated_at": "2023-05-26T10:00:00.000Z" }

#### Create Brand
- **URL**: `/brands`
- **Method**: `POST`
- **Body**:
json { "brand_name": "Samsung" }

- **Response**:
json { "id": 1, "brand_name": "Samsung", "created_at": "2023-05-26T10:00:00.000Z", "updated_at": "2023-05-26T10:00:00.000Z" }


#### Update Brand
- **URL**: `/brands/:id`
- **Method**: `PUT`
- **Body**:
json { "brand_name": "Samsung Electronics" }

- **Response**:
json { "id": 1, "brand_name": "Samsung Electronics", "created_at": "2023-05-26T10:00:00.000Z", "updated_at": "2023-05-26T10:05:00.000Z" }

#### Delete Brand
- **URL**: `/brands/:id`
- **Method**: `DELETE`
- **Response**: Status 204 (No Content)

### Product Catalogs

#### Get All Catalogs
- **URL**: `/catalogs`
- **Method**: `GET`
- **Response**:
json [ { "id": 1, "product_name": "Galaxy S23", "type": "Smartphone", "brand_id": 1, "created_at": "2023-05-26T10:10:00.000Z", "updated_at": "2023-05-26T10:10:00.000Z", "brand": { "id": 1, "brand_name": "Samsung", "created_at": "2023-05-26T10:00:00.000Z", "updated_at": "2023-05-26T10:00:00.000Z" } } ]

#### Get Single Catalog
- **URL**: `/catalogs/:id`
- **Method**: `GET`
- **Response**:
json { "id": 1, "product_name": "Galaxy S23", "type": "Smartphone", "brand_id": 1, "created_at": "2023-05-26T10:10:00.000Z", "updated_at": "2023-05-26T10:10:00.000Z", "brand": { "id": 1, "brand_name": "Samsung", "created_at": "2023-05-26T10:00:00.000Z", "updated_at": "2023-05-26T10:00:00.000Z" } }

#### Create Catalog
- **URL**: `/catalogs`
- **Method**: `POST`
- **Body**:
json { "product_name": "Galaxy S23", "type": "Smartphone", "brand_id": 1 }

- **Response**:
json { "id": 1, "product_name": "Galaxy S23", "type": "Smartphone", "brand_id": 1, "created_at": "2023-05-26T10:10:00.000Z", "updated_at": "2023-05-26T10:10:00.000Z" }

#### Update Catalog
- **URL**: `/catalogs/:id`
- **Method**: `PUT`
- **Body**:
json { "product_name": "Galaxy S23 Ultra", "type": "Premium Smartphone" }

- **Response**:
json { "id": 1, "product_name": "Galaxy S23 Ultra", "type": "Premium Smartphone", "brand_id": 1, "created_at": "2023-05-26T10:10:00.000Z", "updated_at": "2023-05-26T10:15:00.000Z" }

#### Delete Catalog
- **URL**: `/catalogs/:id`
- **Method**: `DELETE`
- **Response**: Status 204 (No Content)

## Contoh Penggunaan dengan cURL

### Membuat Brand
bash curl -X POST -H "Content-Type: application/json" -d '{"brand_name":"Samsung"}' http://localhost:3000/brands

### Membuat Product Catalog
bash curl -X POST -H "Content-Type: application/json" -d '{"product_name":"Galaxy S23", "type":"Smartphone", "brand_id":1}' http://localhost:3000/catalogs

### Mendapatkan Semua Catalogs
bash curl http://localhost:3000/catalogs

## Struktur Database

### Product Brands
| Column      | Type         | Description               |
|-------------|--------------|---------------------------|
| id          | INT          | Primary key               |
| brand_name  | VARCHAR(50)  | Nama brand                |
| created_at  | TIMESTAMP    | Waktu pembuatan           |
| updated_at  | TIMESTAMP    | Waktu update terakhir      |

### Product Catalogs
| Column       | Type         | Description               |
|--------------|--------------|---------------------------|
| id           | INT          | Primary key               |
| product_name | VARCHAR(50)  | Nama produk               |
| type         | VARCHAR(50)  | Tipe produk               |
| brand_id     | INT          | Foreign key ke brands     |
| created_at   | TIMESTAMP    | Waktu pembuatan           |
| updated_at   | TIMESTAMP    | Waktu update terakhir      |
