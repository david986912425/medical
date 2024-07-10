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

db.createCollection('empleados');