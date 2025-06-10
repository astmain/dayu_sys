import { createConnection } from 'typeorm';
import { tb_orm1 } from './src/Controller/orm1/orm1_dto';


createConnection({
    type: 'mysql',
    host: '103.119.2.223',
    port: 3303,
    username: 'root',
    password: '123456',
    database: 'my_db',
    entities: [tb_orm1],
    synchronize: true,
}).then(connection => {
    console.log('Connected to the database');
}).catch(error => {
    console.error('Error connecting to the database:', error);
});







