const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// icon link inside public index.html
app.use(express.static('public'));

// made a welcome page in this api
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FashionHub | API</title>
        <link rel="icon" href="http://localhost:3000/favicon.ico" type="image/x-icon">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
            * {
                box-sizing: border-box;
            }
            body {
                margin: 0;
                padding: 0;
                font-family: 'Montserrat', sans-serif;
                background: linear-gradient(135deg, #858585ff, #d8b781);
                color: #fff;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
            }
            .container {
                background-color: #f4f1ed;
                padding: 40px 30px;
                border-radius: 16px;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
                max-width: 600px;
                width: 90%;
            }
            h1 {
                font-size: 2.5rem;
                font-weight: 700;
                margin-bottom: 10px;
                color: #a3680aff;
            }
            p {
                font-size: 1.1rem;
                font-weight: 400;
                color: #8b5e16ff;
                margin-bottom: 20px;
            }
            code {
                background-color: #f0f0f0;
                color: #a3680a;
                padding: 4px 8px;
                border-radius: 6px;
                font-family: monospace;
            }
            .badge {
                display: inline-block;
                margin-top: 10px;
                background: #00c9ff;
                background: linear-gradient(to right, #92fe9d, #00c9ff);
                color: #000;
                padding: 8px 16px;
                font-weight: 600;
                border-radius: 20px;
                font-size: 0.9rem;
            }
            .frontend-btn {
                display: inline-block;
                margin-top: 30px;
                padding: 12px 24px;
                background: linear-gradient(to right, #d8b781, #a3680a);
                color: #000;
                font-weight: 600;
                text-decoration: none;
                border-radius: 30px;
                transition: 0.3s ease;
                position: relative;
            }
            .frontend-btn:hover {
                box-shadow: 0 12px 16px -8px rgba(0, 0, 0, 0.66);
                transform: translateY(-6px);
            }

            /* api endpoints container */
            .api-endpoints {
                background-color: #aa7c31ff;
                padding: 20px;
                border-top-right-radius: 16px;
                border-bottom-left-radius: 16px;
                margin-top: 20px;
            }
            .api-endpoints p {
                color: #f9f9f9;
                font-weight: 500;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to FashionHub's API!</h1>
            <p>The API for FashionHub is running smoothly.</p>

            <!-- API endpoints container -->
            <div class="api-endpoints">
                <p>Available endpoints :</p>
                <p><code>/api/auth</code> – Handles login & registration</p>
                <p><code>/api/products</code> – Provides product listings</p>
                <p><code>/api/cart</code> – Handles the cart logic</p>
                <p><code>/api/orders</code> – Handles the orders logic & checkout</p>
                
                </div>
                <div class="badge">Status: Live</div>

            <!-- link to the frontend -->
            <a href="http://localhost:8080/" class="frontend-btn" target="_blank">View Frontend</a>
        </div>
    </body>
    </html>
`);
});


// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');

app.use('/api/orders', ordersRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

//---------------------------------- Routes function importing: ------------------------------------------

const {
  LoadProdsTopsCon,
  LoadProdsBottomsCon,
  LoadProdsSneakersCon,
  LoadProdsAccessoriesCon,
  LoadProdsFeaturedCon,
  LoadProdsTopsByTypeCon,
  LoadProdsTopsByStyleCon,
  LoadProdsTopsByPriceCon,
  LoadProdsBottomsByTypeCon,
  LoadProdsBottomsByStyleCon,
  LoadProdsBottomsByPriceCon,
  LoadProdsSneakersByTypeCon,
  LoadProdsSneakersByStyleCon,
  LoadProdsSneakersByPriceCon,
  LoadProdsAccessoriesByTypeCon,
  LoadProdsAccessoriesByStyleCon,
  LoadProdsAccessoriesByPriceCon,

} = require('./ShopFuncs/ShopFuncs.js');

//---------------------------------- Base Loaders Routes: -----------------------------------------

app.get('/products/load/tops', LoadProdsTopsCon);
app.get('/products/load/bottoms', LoadProdsBottomsCon);
app.get('/products/load/sneakers', LoadProdsSneakersCon);
app.get('/products/load/accessories', LoadProdsAccessoriesCon);
app.get('/products/load/featured', LoadProdsFeaturedCon);

//---------------------------------- Tops Filter Routes: ------------------------------------------

app.get('/products/load/tops/type/:type', LoadProdsTopsByTypeCon);
app.get('/products/load/tops/style/:style', LoadProdsTopsByStyleCon);
app.get('/products/load/tops/price', LoadProdsTopsByPriceCon);

//---------------------------------- Bottoms Filter Routes: ---------------------------------------

app.get('/products/load/bottoms/type/:type', LoadProdsBottomsByTypeCon);
app.get('/products/load/bottoms/style/:style', LoadProdsBottomsByStyleCon);
app.get('/products/load/bottoms/price', LoadProdsBottomsByPriceCon);

//---------------------------------- Sneakers Filter Routes: --------------------------------------

app.get('/products/load/sneakers/type/:type', LoadProdsSneakersByTypeCon);
app.get('/products/load/sneakers/style/:style', LoadProdsSneakersByStyleCon);
app.get('/products/load/sneakers/price', LoadProdsSneakersByPriceCon);

//------------------------------- Accessories Filter Routes: --------------------------------------

app.get('/products/load/accessories/type/:type', LoadProdsAccessoriesByTypeCon);
app.get('/products/load/accessories/style/:style', LoadProdsAccessoriesByStyleCon);
app.get('/products/load/accessories/price', LoadProdsAccessoriesByPriceCon);

app.use((req, res) => {
  console.log("Unmatched route:", req.method, req.url);
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));