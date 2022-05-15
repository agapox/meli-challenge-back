import express from 'express';

const app = express();

// middleware transform req.body to JSON
app.use(express.json());

const PORT = 3000;

app.get('/', (_req,res) => {
    console.log('Working!!! ' + new Date().toLocaleDateString())
    res.send('Hello world')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})