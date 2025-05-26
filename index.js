// index.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

// Routes untuk Product Brands
app.get('/brands', async (req, res) => {
    try {
        const brands = await prisma.productBrands.findMany();
        res.json(brands);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil data brands' });
    }
});

app.get('/brands/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const brand = await prisma.productBrands.findUnique({
            where: { id: parseInt(id) },
        });
        if (brand) {
            res.json(brand);
        } else {
            res.status(404).json({ error: 'Brand tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil data brand' });
    }
});

app.post('/brands', async (req, res) => {
    const { brand_name } = req.body;
    try {
        const newBrand = await prisma.productBrands.create({
            data: { brand_name },
        });
        res.status(201).json(newBrand);
    } catch (error) {
        res.status(400).json({ error: 'Gagal membuat brand baru' });
    }
});

app.put('/brands/:id', async (req, res) => {
    const { id } = req.params;
    const { brand_name } = req.body;
    try {
        const updatedBrand = await prisma.productBrands.update({
            where: { id: parseInt(id) },
            data: { brand_name },
        });
        res.json(updatedBrand);
    } catch (error) {
        res.status(400).json({ error: 'Gagal mengupdate brand' });
    }
});

app.delete('/brands/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.productBrands.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: 'Gagal menghapus brand' });
    }
});

// Routes untuk Product Catalogs
app.get('/catalogs', async (req, res) => {
    try {
        const catalogs = await prisma.productCatalogs.findMany({
            include: { brand: true },
        });
        res.json(catalogs);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil data catalogs' });
    }
});

app.get('/catalogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const catalog = await prisma.productCatalogs.findUnique({
            where: { id: parseInt(id) },
            include: { brand: true },
        });
        if (catalog) {
            res.json(catalog);
        } else {
            res.status(404).json({ error: 'Catalog tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil data catalog' });
    }
});

app.post('/catalogs', async (req, res) => {
    const { product_name, type, brand_id } = req.body;
    try {
        const newCatalog = await prisma.productCatalogs.create({
            data: {
                product_name,
                type,
                brand_id: brand_id ? parseInt(brand_id) : null,
            },
        });
        res.status(201).json(newCatalog);
    } catch (error) {
        res.status(400).json({ error: 'Gagal membuat catalog baru' });
    }
});

app.put('/catalogs/:id', async (req, res) => {
    const { id } = req.params;
    const { product_name, type, brand_id } = req.body;
    try {
        const updatedCatalog = await prisma.productCatalogs.update({
            where: { id: parseInt(id) },
            data: {
                product_name,
                type,
                brand_id: brand_id ? parseInt(brand_id) : null,
            },
        });
        res.json(updatedCatalog);
    } catch (error) {
        res.status(400).json({ error: 'Gagal mengupdate catalog' });
    }
});

app.delete('/catalogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.productCatalogs.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: 'Gagal menghapus catalog' });
    }
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

// Handle shutdown gracefully
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
});