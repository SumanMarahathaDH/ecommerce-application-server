import express from 'express';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import morgan from 'morgan';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173/'
}))
app.use(morgan('dev'))

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/category', categoryRoutes)

export default app