CREATE DATABASE IF NOT EXISTS fashion_store;
USE fashion_store;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- products table (home page for now, will use the same table for shop)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(1000),
    category VARCHAR(100),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- insert into products table
-- Tops (10 products)
INSERT INTO products (title, description, price, image, category, is_featured) VALUES
('Classic White Tee', 'Premium cotton crew neck t-shirt with perfect fit', 100.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'tops', TRUE),
('Striped Long Sleeve', 'Breathable striped shirt with comfortable stretch', 139.99, 'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/455406/item/goods_69_455406_3x4.jpg?width=600', 'tops', FALSE),
('V-Neck Sweater', 'Soft wool blend v-neck sweater for casual elegance', 159.99, 'https://image.hm.com/assets/hm/a5/6c/a56c6adca73b4fd9940485b36128b11274c58b42.jpg?imwidth=1260', 'tops', TRUE),
('Denim Button-Up', 'Classic denim shirt with vintage wash', 349.99, 'https://img.abercrombie.com/is/image/anf/KIC_125-4040-0055-276_prod1?policy=product-large', 'tops', FALSE),
('Silk Blouse', 'Luxurious silk blouse with delicate button details', 479.99, 'https://sly010.com/app/uploads/2024/05/42100BL1054-393_1-400x600.jpg', 'tops', FALSE),
('Oversized Hoodie', 'Cozy oversized hoodie with front pocket', 245.99, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'tops', FALSE),
('Polo Shirt', 'Classic polo shirt with embroidered logo', 134.99, 'https://freshcleantees.com/cdn/shop/files/GhostMannequinsPOLOWedgewood_737x980.jpg?v=1715102597', 'tops', FALSE),
('Crop Top', 'Trendy ribbed crop top for summer styling', 129.99, 'https://cdn-images.farfetch-contents.com/19/65/72/09/19657209_43984708_600.jpg', 'tops', FALSE),
('Turtleneck Sweater', 'Warm knit turtleneck for chilly days', 554.99, 'https://media.takealot.com/covers_images/2f5ae2c08ea84df2a52a7c77b3ba999b/s-zoom.file', 'tops', TRUE),
('Flannel Shirt', 'Soft flannel shirt with classic plaid pattern', 242.99, 'https://shop.five6seven8.co.za/wp-content/uploads/2024/03/Red_Black-Checkered-Button-Up-Collared-Shirt-Short-Sleeve-2-min.png', 'tops', FALSE);

-- Bottoms (10 products)
INSERT INTO products (title, description, price, image, category, is_featured) VALUES
('Slim Fit Jeans', 'Comfortable stretch denim with modern slim fit', 469.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'bottoms', TRUE),
('Casual Chinos', 'Versatile cotton chinos with straight leg cut', 249.99, 'https://johncraig.co.za/media/catalog/product/cache/8e71962534cb112d3996d77af375c1d8/l/s/lst84b-lyle-scott-chino-blk-tr2110ita-v1_jpg.jpg', 'bottoms', FALSE),
('Leather Midi Skirt', 'Elegant faux leather midi skirt with side slit', 464.99, 'https://cdn.media.amplience.net/i/truworths/prod3229626_2?fmt=jpeg&qlt=100', 'bottoms', TRUE),
('Cargo Pants', 'Utility cargo pants with multiple pockets', 59.99, 'https://cdn-images.farfetch-contents.com/24/37/01/35/24370135_54411914_1000.jpg', 'bottoms', FALSE),
('Yoga Leggings', 'High-waisted leggings with moisture-wicking fabric', 644.99, 'https://assets.adidas.com/images/w_940,f_auto,q_auto/6cca9a02f7dc4149ba95adb000fcaab2_9366/HC6637_01_laydown.jpg', 'bottoms', FALSE),
('Wide-Leg Trousers', 'Flowy wide-leg trousers with crease detail', 354.99, 'https://i1.adis.ws/i/truworths/prod3120874_1.jpeg', 'bottoms', FALSE),
('Denim Shorts', 'Distressed denim shorts with frayed hem', 239.99, 'https://i1.adis.ws/i/truworths/prod3183831_1.jpeg', 'bottoms', FALSE),
('Pleated Skirt', 'Elegant pleated midi skirt with elastic waist', 147.99, 'https://cdn.media.amplience.net/i/truworths/prod3017727_2?fmt=auto&$pdp-main-mobile$', 'bottoms', FALSE),
('Tailored Trousers', 'Professional tailored trousers with sharp crease', 274.99, 'https://cdn-images.farfetch-contents.com/24/25/95/81/24259581_55705911_600.jpg', 'bottoms', TRUE),
('Jogger Pants', 'Comfortable joggers with ribbed cuffs', 142.99, 'https://cdn.media.amplience.net/i/truworths/prod3151101_1?fmt=auto&$pdp-main-mobile$', 'bottoms', FALSE);

-- Sneakers (10 products)
INSERT INTO products (title, description, price, image, category, is_featured) VALUES
('Classic White Sneakers', 'Iconic white sneakers', 249.99, 'https://images.puma.net/images/402223/02/sv04/fnd/ZAF/w/600/h/600/fmt/png/bg/%23FAFAFA', 'sneakers', TRUE),
('Running Shoes', 'Lightweight running shoes with cushion technology', 119.99, 'https://contents.mediadecathlon.com/p2299509/k$9d6b363f1948f8e4b8570c368ac670ba/men-s-trail-running-shoes-tr2-black-green.jpg', 'sneakers', FALSE),
('High-Top Canvas', 'Classic high-top sneakers in durable canvas', 289.99, 'https://i.etsystatic.com/40921212/r/il/6ad4df/5185491374/il_300x300.5185491374_pimp.jpg', 'sneakers', TRUE),
('Slip-On Sneakers', 'Convenient slip-on design with memory foam insole', 99.99, 'https://lh6.googleusercontent.com/proxy/G-9XVP0o1AJkIugwBtPzMQG1v0bmj1SvqsQJgpApkR4J6a9BgCilzJpx5dz7dDZo2DgI57u-nt5QIiobGFtrhjXmskJaTfMWwbsIzn_RQ0OI6pSNmyy2lZptE72WluO5bxlx8VOWEiqLD3vEw9fCFq2EZMiOK2PRpMrkoh0xUiS3WjD3AOe7_OGy6M0kAkF-TNSGxVFCTM9tVfOIXru9cNxXJ7qOe2JZoA-d5Uu_TmA', 'sneakers', FALSE),
('Leather Athletic Shoes', 'Premium leather athletic shoes with cushioned support', 199.99, 'https://shoebox.co.za/cdn/shop/files/Madison-Ladies-High-Fashion-Apollo-Sneaker-Black-Sneakers-Madison-Heart-of-New-York-2.jpg?v=1754036310', 'sneakers', FALSE),
('Platform Sneakers', 'Trendy platform sneakers with chunky sole', 284.99, 'https://tributestore.co.za/cdn/shop/files/Lyra_Leather_Platform_Sneaker_In_Bottle_Green_1.png?v=1746427901', 'sneakers', FALSE),
('Minimalist Running Shoes', 'Sleek minimalist design with responsive cushioning', 449.99, 'https://www.wildearth.com.au/assets/full/16M3101-41.jpg?20240404084629', 'sneakers', FALSE),
('Colorblock Sneakers', 'Bold colorblock design with contrast details', 194.99, 'https://images.marleylilly.com/profiles/ml-product-detail/product/93007/F1p-monogrammed-colorblock-sneakers-in-charcoal.jpg', 'sneakers', TRUE),
('Retro Running Shoes', 'Vintage-inspired running shoes with modern comfort', 104.99, 'https://assets.adidas.com/images/w_940,f_auto,q_auto/12b7db8ddaaa4008880783abb85e00bd_9366/IH8590_04_standard.jpg', 'sneakers', FALSE),
('Knitted Sneakers', 'Breathable knitted upper with flexible sole', 189.99, 'https://vaistoa.com/cdn/shop/files/vaistoa_iloa_barefoot_shoes_knitted_sneakers_gray_front_angle_single.jpg?v=1755205356&width=1080', 'sneakers', FALSE);

-- Accessories (10 products)
INSERT INTO products (title, description, price, image, category, is_featured) VALUES
('Leather Crossbody Bag', 'Genuine leather crossbody bag with adjustable strap', 289.99, 'https://media.takealot.com/covers_images/ef301c2194cb4d04a532ddcb22be1b8c/s-pdpxl.file', 'accessories', TRUE),
('Designer Sunglasses', 'UV-protective sunglasses with polarized lenses', 129.99, 'https://res.cloudinary.com/nmg-prod/image/upload/c_fill,w_480/f_auto/cs_srgb,q_auto:good/v1739379847/product/nm_4966353_100324_m.tiff', 'accessories', FALSE),
('Wool Beanie', 'Soft wool beanie for cold weather comfort', 89.99, 'https://www.babycouture.co.za/cdn/shop/products/DSC_0263_1024x1024_2x_b48d0612-ec76-4389-8bd6-5349f409b7ba_1024x1024.webp?v=1650968001', 'accessories', FALSE),
('Silk Scarf', 'Elegant silk scarf with floral print', 45.99, 'https://exclusivehijabs.co.za/cdn/shop/products/image-13-17_2048x.jpg?v=1652279385', 'accessories', FALSE),
('Leather Belt', 'Genuine leather belt with polished buckle', 149.99, 'https://www.montblanc.com/variants/images/34480784411797995/A/w2500.jpg', 'accessories', FALSE),
('Statement Necklace', 'Handcrafted statement necklace with semi-precious stones', 364.99, 'https://www.lovisajewellery.co.za/cdn/shop/files/51517960_3_1024x1024.jpg?v=1714467881', 'accessories', TRUE),
('Leather Wallet', 'Slim leather wallet with multiple card slots', 89.99, 'https://madebyartisans.co.za/cdn/shop/files/groundcover-large-mens-leather-wallet-wallets-groundcover-black-987422.jpg?v=1704392433', 'accessories', FALSE),
('Leather Watch', 'Minimalist leather strap watch with case', 539.99, 'https://www.geewiz.co.za/175360-large_default/fossil-men-s-grant-rose-gold-round-leather-watch.jpg', 'accessories', TRUE),
('Cashmere Gloves', 'Luxurious cashmere fingerliss gloves', 149.99, 'https://www.barrie.com/cdn/shop/files/c168835124-shearling-effect-cashmere-fingerless-gloves-jean-nettle-packshot.jpg?v=1719221309&width=2048', 'accessories', FALSE),
('Aviator Sunglasses', 'Classic aviator style with gradient lenses', 149.99, 'https://dbiyorq10n2b9.cloudfront.net/product-images/SUNBUL0160/BYKVwRw5VPhpdffdTZcR7UpczZzbBWIu2XqqePD6_1738074591.webp', 'accessories', TRUE);

-- Cart table
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_item (user_id, product_id) -- Prevents duplicate items
);

-- Orders table: stores the main order record
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled') DEFAULT 'pending',
    shipping_address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    payment_method ENUM('card', 'paypal', 'cod') DEFAULT 'card',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order items table: links products to an order
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Updating products with new coloumns:
ALTER TABLE `fashion_store`.`products` 
ADD COLUMN `type` VARCHAR(6) NULL AFTER `created_at`,
ADD COLUMN `style` VARCHAR(20) NULL AFTER `type`;

-- Updating New Product catergories:
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'Casual' WHERE (`id` = '1');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'Casual' WHERE (`id` = '2');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'Casual' WHERE (`id` = '3');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'SmartCasual' WHERE (`id` = '4');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'SmartCasual' WHERE (`id` = '5');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'Casual' WHERE (`id` = '6');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'Formal' WHERE (`id` = '7');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'Casual' WHERE (`id` = '8');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'SmartCasual' WHERE (`id` = '9');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'Casual' WHERE (`id` = '10');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'Casual' WHERE (`id` = '11');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'Casual' WHERE (`id` = '12');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'Formal' WHERE (`id` = '13');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'Casual' WHERE (`id` = '14');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'Sport' WHERE (`id` = '15');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'Casual' WHERE (`id` = '16');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'Casual' WHERE (`id` = '17');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'SmartCasual' WHERE (`id` = '18');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'Formal' WHERE (`id` = '19');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'Sport' WHERE (`id` = '20');
UPDATE `fashion_store`.`products` SET `type` = 'Youth', `style` = 'Casual' WHERE (`id` = '21');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'Sport' WHERE (`id` = '22');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'SmartCasual' WHERE (`id` = '23');
UPDATE `fashion_store`.`products` SET `type` = 'Youth', `style` = 'Casual' WHERE (`id` = '24');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'Sport' WHERE (`id` = '25');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'Casual' WHERE (`id` = '26');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'Sport' WHERE (`id` = '27');
UPDATE `fashion_store`.`products` SET `type` = 'Youth', `style` = 'Casual' WHERE (`id` = '28');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'Sport' WHERE (`id` = '29');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'Casaul' WHERE (`id` = '30');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'SmartCasual' WHERE (`id` = '31');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'SmartCasual' WHERE (`id` = '32');
UPDATE `fashion_store`.`products` SET `type` = 'Youth', `style` = 'Casual' WHERE (`id` = '33');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'SmartCasual' WHERE (`id` = '34');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'Formal' WHERE (`id` = '35');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'Formal' WHERE (`id` = '36');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'SmartCasual' WHERE (`id` = '37');
UPDATE `fashion_store`.`products` SET `type` = 'Male', `style` = 'Casual' WHERE (`id` = '38');
UPDATE `fashion_store`.`products` SET `type` = 'Female', `style` = 'Casual' WHERE (`id` = '39');
UPDATE `fashion_store`.`products` SET `type` = 'Youth', `style` = 'Casual' WHERE (`id` = '40');
