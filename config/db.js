const {MongoClient} = require('mongodb');
/* Importo el cliente de MongoDB y lo inicializo con la uri de la BD
y el resto de configuración, después lo exporto como un módulo.
Esto hará que node lo trate como un Singleton y se cargue una vez
y se pueda utilizar todas las veces necesarias dentro del proyecto.*/
const client = new MongoClient(process.env.DB_CONNECT,
    {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = client;
