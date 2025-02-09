import express from 'express'
import dotenv from 'dotenv'
import { connectToDb } from './config/dbConfig.js';
import resumeRoutes from './routes/resumeRoute.js'
import userRoutes from './routes/authRoutes.js'
import cors from "cors";

dotenv.config();
connectToDb()
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "https://ai-resume-builder-1-i1sf.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.get('/', (req, res) => {
    res.send("welcome to ai resume builder")
})
app.use('/api/user', userRoutes)
app.use('/api/resume', resumeRoutes)


app.listen(process.env.PORT, () => {

    console.log(`server started at port  ${process.env.PORT}`);


})