const express=require('express');
const app=express();
const bodyParser =require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');
const cors=require('cors')
require('dotenv/config');
const Product=require('./models/product');
const authJwt=require('./helpers/jwt');
const errorHandler=require('./helpers/error-handler');     // problem error catch


app.use(cors());
app.options('*',cors());



// middleware

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt())
app.use(errorHandler);

// app.use(errorHandler);
// app.use((err, req, res, next => {
//     if(err){
//         res.status(500).json({message:"error in the server"});
//     }
// }))





//Routers
const categoriesRoutes =require('./routers/categories');
const productsRoutes =require('./routers/products');
const usersRoutes=require('./routers/users');
const orderRoutes=require('./routers/orders');

const api =process.env.API_URL;


app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, orderRoutes);




mongoose.connect(process.env.CONNECTION_STRING,{
    useUnifiedTopology: true,
    useNewUrlParser:true,
    dbName: 'eshop-database',
    ReferenceError:false,


})
.then(() =>{
    console.log('database connection ready....')
})
    .catch(()=>{
        console.log(err)
    })

app.listen(3000,()=>{
    // console.log(api);
    console.log('server runing http://localhost:3000');
})
