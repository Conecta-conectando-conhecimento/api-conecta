// import 'reflect-metadata';

// import dotenv from 'dotenv';
// import express from 'express';

// import router from './routes';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.use(express.json());

// app.use(router);

// app.get('/', (req, res) => {
//     res.json({
//         message: 'API Conecta',
//         time: new Date().toString(),
//         path: __dirname,
//     });
// });

import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; // Importe o pacote cors

import router from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.json());

// Configure o CORS
app.use(cors());

app.use(router);

app.get('/', (req, res) => {
    res.json({
        message: 'API Conecta',
        time: new Date().toString(),
        path: __dirname,
    });
});
