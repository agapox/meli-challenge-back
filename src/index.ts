import express from 'express';
import 'dotenv/config';
import itemsRouter from './routes/items.router';

const app = express();

// middleware transform req.body to JSON
app.use(express.json());

const PORT = process.env.PORT;

const paths = {
    items: '/api/items'
}

app.use(paths.items, itemsRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

export {
    paths
}