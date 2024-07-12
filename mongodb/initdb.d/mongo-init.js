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
    name: 'David',
    lastname: 'Mamani',
    email: 'david@gmail.com',
    password: '$2a$12$s13hbY2sF5Zouhrw.Gri9.DdzsStJJldJSQ4AeMKBwzVroNPjfGaG',
    role: 'admin'
});

db.categories.insertOne({
    name: 'Medicamentos'
});

var category = db.categories.findOne({ name: 'Medicamentos' });

db.products.insertOne({
    nombre: 'Aspirina',
    precio: 10.50,
    descripcion: 'Medicamento para el dolor de cabeza',
    laboratorio: 'Bayer',
    stock: 100,
    vencimiento: ISODate('2025-12-31'),
    imagen: 'https://s1.elespanol.com/2018/06/08/ciencia/salud/farmacologia-farmacologia_clinica-salud_313481328_81018046_1706x960.jpg',
    categoria: category._id
});
