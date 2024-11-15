db = db.getSiblingDB('medicaldb');

db.createUser({
    user: "david",
    pwd: "secret",
    roles: [
        {
            role: 'readWrite',
            db: 'medicaldb'
        },
    ],
});

db.createCollection('users');
db.createCollection('categories');
db.createCollection('products');

db.users.insertOne({
    name: 'Roxana',
    lastname: 'Condori',
    email: 'roxana@gmail.com',
    password: '$2a$12$s13hbY2sF5Zouhrw.Gri9.DdzsStJJldJSQ4AeMKBwzVroNPjfGaG',
    role: 'admin'
});

db.users.insertOne({
    name: 'Angel',
    lastname: 'Calla',
    email: 'angel@gmail.com',
    password: '$2a$12$s13hbY2sF5Zouhrw.Gri9.DdzsStJJldJSQ4AeMKBwzVroNPjfGaG',
    role: 'admin'
});

db.categories.insertOne({
    name: 'Medicamentos'
});

const category = db.categories.findOne({name: 'Medicamentos'});

db.products.insertMany([
    {
        nombre: 'Aspirina',
        precio: 10.50,
        descripcion: 'Medicamento para el dolor de cabeza',
        laboratorio: 'Bayer',
        stock: 100,
        vencimiento: ISODate('2025-12-31'),
        imagen: 'https://s1.elespanol.com/2018/06/08/ciencia/salud/farmacologia-farmacologia_clinica-salud_313481328_81018046_1706x960.jpg',
        categoria: category._id
    },
    {
        nombre: 'Paracetamol',
        precio: 8.75,
        descripcion: 'Analgésico y antipirético',
        laboratorio: 'Genfar',
        stock: 200,
        vencimiento: ISODate('2024-11-30'),
        imagen: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/108010X.jpg',
        categoria: category._id
    },
    {
        nombre: 'Ibuprofeno',
        precio: 12.00,
        descripcion: 'Anti-inflamatorio no esteroideo',
        laboratorio: 'Pfizer',
        stock: 150,
        vencimiento: ISODate('2026-01-15'),
        imagen: 'https://farmaciauniversal.com/assets/sources/PRODUCTOS/00890a.jpg',
        categoria: category._id
    },
    {
        nombre: 'Amoxicilina',
        precio: 18.25,
        descripcion: 'Antibiótico de amplio espectro',
        laboratorio: 'Sandoz',
        stock: 75,
        vencimiento: ISODate('2023-10-20'),
        imagen: 'https://farmaciauniversal.com/assets/sources/PRODUCTOS/22598a.jpg',
        categoria: category._id
    },
    {
        nombre: 'Loratadina',
        precio: 15.00,
        descripcion: 'Antihistamínico',
        laboratorio: 'Teva',
        stock: 300,
        vencimiento: ISODate('2027-05-10'),
        imagen: 'https://contifarma.pe/wp-content/uploads/2021/09/Loratadina-10-mg.png',
        categoria: category._id
    }
]);
