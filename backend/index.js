import express from 'express'
import dotenv from 'dotenv'
import { connectToDb } from './config/dbConfig.js';
import resumeRoutes from './routes/resumeRoute.js'
import userRoutes from './routes/authRoutes.js'
import cors from "cors";
import path from 'path'

dotenv.config();
connectToDb()
const app = express();

app.use(cors());
const corsOptions = {
    origin: ['http://localhost:5173', 'https://ai-resume-builder-1-i1sf.onrender.com'], // Update with frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies if needed
};

app.use(cors(corsOptions));

app.use(express.json());
app.get('/', (req, res) => {
    res.send("welcome to ai resume builder")
})
app.use('/api/user', userRoutes)
app.use('/api/resume', resumeRoutes)


//production code 
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Backend is running...');
    });
}

app.listen(process.env.PORT, () => {

    console.log(`server started at port  ${process.env.PORT}`);


})