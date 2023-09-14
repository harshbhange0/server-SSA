import express from 'express';
import cors from 'cors'; // Import the cors middleware
import {AuthAdminS ,AuthAdminSLogIn }from './routes/AuthAdminS.js';
import AllAdmin from './routes/AllAdmin.js';
import connectionMongoDB from './db/DBConnect.js';

const app = express();

// Configure CORS to allow requests from http://localhost:3000
app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use('/admin', AuthAdminS);
app.use('/admin', AllAdmin);
app.use('/admin', AuthAdminSLogIn);

connectionMongoDB();

app.listen(5000, () => {
  console.log('Listen on port 5000');
});
