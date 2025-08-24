const db = require('../db/db.js');

//---------------------------------------- Base Loaders --------------------------------------------

// load all the products
const LoadProdsAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products;', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// here i use LoadProdsAll to load all products
const LoadProdsAllCon = (req, res) => {
  LoadProdsAll()
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products:', error);
      res.status(500).json({ error: 'Failed to load products' });
    });
};

const LoadProdsTops = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products WHERE category = "Tops";', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const LoadProdsTopsCon = (req, res) => {
  LoadProdsTops()
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

const LoadProdsBottoms = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products WHERE category = "Bottoms";', (err, results) => {
      if (err) return reject(err);
      resolve(results);

    })

  })

}

const LoadProdsSneakers = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products WHERE category = "Sneakers";', (err, results) => {
      if (err) return reject(err);
      resolve(results);

    })

  })

}

const LoadProdsAccesories = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products WHERE category = "Accessories";', (err, results) => {
      if (err) return reject(err);
      resolve(results);

    })

  })

}

const LoadProdsFeatured = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products WHERE is_featured = 1;', (err, results) => {
      if (err) return reject(err);
      resolve(results);

    })

  })

}

const LoadProdsBottomsCon = (req, res) => {
  LoadProdsBottoms()
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

const LoadProdsSneakersCon = (req, res) => {
  LoadProdsSneakers()
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

const LoadProdsAccessoriesCon = (req, res) => {
  LoadProdsAccesories()
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

const LoadProdsFeaturedCon = (req, res) => {
  LoadProdsFeatured()
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};
//-------------------------------------------------------------------------------------------------
//                                             TOPS:
//----------------------------------- Tops fitlering by type --------------------------------------

const LoadProdsTopsByType = (type) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE category = "Tops" AND type = ?;';
    db.query(sql, [type], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });

  });

};

const LoadProdsTopsByTypeCon = (req, res) => {
  const { type } = req.params;
  LoadProdsTopsByType(type)
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products by type:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

//-------------------------------------------------------------------------------------------------

//----------------------------------- Tops filtering by style -------------------------------------

const LoadProdsTopsByStyle = (style) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE category = "Tops" AND style = ?;';
    db.query(sql, [style], (err, results) => {
      if (err) return reject(err);
      resolve(results);

    });

  });

};

const LoadProdsTopsByStyleCon = (req, res) => {
  const { style } = req.params;
  LoadProdsTopsByStyle(style)
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products by style:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

//-------------------------------------------------------------------------------------------------

//-------------------- Tops filtering by price range (min/max querystring) ------------------------

const LoadProdsTopsByPrice = (min, max) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE category = "Tops" AND price BETWEEN ? AND ?;';
    db.query(sql, [min, max], (err, results) => {
      if (err) return reject(err);
      resolve(results);

    });

  });

};

const LoadProdsTopsByPriceCon = (req, res) => {
  const min = Number(req.query.min ?? 0);
  const max = Number(req.query.max ?? 999999);
  LoadProdsTopsByPrice(min, max)
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products by price:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

//-------------------------------------------------------------------------------------------------
//                                             BOTTOMS:
//------------------------------------ Bottoms filtering by type ----------------------------------

const LoadProdsBottomsByType = (type) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE category = "Bottoms" AND type = ?;';
    db.query(sql, [type], (err, results) => {
      if (err) return reject(err);
      resolve(results);

    });

  });

};

const LoadProdsBottomsByTypeCon = (req, res) => {
  const { type } = req.params;
  LoadProdsBottomsByType(type)
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products by type:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

//-------------------------------------------------------------------------------------------------

//---------------------------------- Bottoms filtering by style -----------------------------------

const LoadProdsBottomsByStyle = (style) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE category = "Bottoms" AND style = ?;';
    db.query(sql, [style], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });

  });

};

const LoadProdsBottomsByStyleCon = (req, res) => {
  const { style } = req.params;
  LoadProdsBottomsByStyle(style)
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products by style:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

//-------------------------------------------------------------------------------------------------

//-------------------- Bottoms filtering by price range (min/max querystring) ---------------------
const LoadProdsBottomsByPrice = (min, max) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE category = "Bottoms" AND price BETWEEN ? AND ?;';
    db.query(sql, [min, max], (err, results) => {
      if (err) return reject(err);
      resolve(results);

    });

  });

};

const LoadProdsBottomsByPriceCon = (req, res) => {
  const min = Number(req.query.min ?? 0);
  const max = Number(req.query.max ?? 999999);
  LoadProdsBottomsByPrice(min, max)
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products by price:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

//-------------------------------------------------------------------------------------------------
//                                              SNEAKERS:
//------------------------------------ Sneakers Filtering by type ---------------------------------

const LoadProdsSneakersByType = (type) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE category = "Sneakers" AND type = ?;';
    db.query(sql, [type], (err, results) => {
      if (err) return reject(err);
      resolve(results);

    });

  });

};

const LoadProdsSneakersByTypeCon = (req, res) => {
  const { type } = req.params;
  LoadProdsSneakersByType(type)
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products by type:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

//-------------------------------------------------------------------------------------------------

//------------------------------------ Sneakers Filtering by style --------------------------------

const LoadProdsSneakersByStyle = (style) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE category = "Sneakers" AND style = ?;';
    db.query(sql, [style], (err, results) => {
      if (err) return reject(err);
      resolve(results);

    });

  });

};

const LoadProdsSneakersByStyleCon = (req, res) => {
  const { style } = req.params;
  LoadProdsSneakersByStyle(style)
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products by style:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

//-------------------------------------------------------------------------------------------------

//------------------- Sneakers filtering by price range (min/max querystring) ---------------------

const LoadProdsSneakersByPrice = (min, max) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE category = "Sneakers" AND price BETWEEN ? AND ?;';
    db.query(sql, [min, max], (err, results) => {
      if (err) return reject(err);
      resolve(results);

    });

  });

};

const LoadProdsSneakersByPriceCon = (req, res) => {
  const min = Number(req.query.min ?? 0);
  const max = Number(req.query.max ?? 999999);
  LoadProdsSneakersByPrice(min, max)
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products by price:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

//-------------------------------------------------------------------------------------------------
//                                        ACCESSORIES:
//--------------------------------- Accessories Filtering by type --------------------------------

const LoadProdsAccessoriesByType = (type) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE category = "Accessories" AND type = ?;';
    db.query(sql, [type], (err, results) => {
      if (err) return reject(err);
      resolve(results);

    });

  });

};

const LoadProdsAccessoriesByTypeCon = (req, res) => {
  const { type } = req.params;
  LoadProdsAccessoriesByType(type)
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products by type:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

//-------------------------------------------------------------------------------------------------

//--------------------------------- Accessories Filtering by style --------------------------------

const LoadProdsAccessoriesByStyle = (style) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE category = "Accessories" AND style = ?;';
    db.query(sql, [style], (err, results) => {
      if (err) return reject(err);
      resolve(results);

    });

  });

};

const LoadProdsAccessoriesByStyleCon = (req, res) => {
  const { style } = req.params;
  LoadProdsAccessoriesByStyle(style)
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products by style:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

//-------------------------------------------------------------------------------------------------

//------------------ Accessories filtering by price range (min/max querystring) -------------------

const LoadProdsAccessoriesByPrice = (min, max) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE category = "Accessories" AND price BETWEEN ? AND ?;';
    db.query(sql, [min, max], (err, results) => {
      if (err) return reject(err);
      resolve(results);

    });

  });

};

const LoadProdsAccessoriesByPriceCon = (req, res) => {
  const min = Number(req.query.min ?? 0);
  const max = Number(req.query.max ?? 999999);
  LoadProdsAccessoriesByPrice(min, max)
    .then(prods => res.json({ prods }))
    .catch(error => {
      console.error('Error loading products by price:', error);
      res.status(500).json({ error: 'Failed to load products' });

    });

};

//-------------------------------------------------------------------------------------------------

//-------------------------------------- Route Function exports -----------------------------------

module.exports = {
  LoadProdsAllCon,
  LoadProdsTopsCon, LoadProdsBottomsCon, LoadProdsSneakersCon, LoadProdsAccessoriesCon, LoadProdsFeaturedCon,
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
};