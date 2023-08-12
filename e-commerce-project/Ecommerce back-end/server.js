const express = require('express');
const connectDb = require('./config/dbConfig');
const dotenv = require('dotenv').config();
const port = process.env.PORT||4000;
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const blogRouter = require('./routes/blogRoute');
const categoryRouter = require('./routes/categoryRoute');
const brandRouter = require('./routes/brandRoute')
const cookieParser =require('cookie-parser');
const { notFound, errorHnadler } = require('./middleware/errorHandler');
const morgan = require('morgan')
const app = express();

connectDb();

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api/user',authRouter)
app.use('/api/product',productRouter)
app.use('/api/blog',blogRouter)
app.use('/api/category',categoryRouter)
app.use('/api/brand',brandRouter)





app.use([notFound,errorHnadler])

app.listen(port,()=>{
    console.log(`Server is running on PORT:${port}... `)
})