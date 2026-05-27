import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- MOCK DATABASE ---

let products = [
  {
    id: "1",
    name: "Nebula Ultra Headphones",
    price: 299.99,
    category: "Electronics",
    description: "High-fidelity noise-cancelling headphones with 40-hour battery life and spatial audio.",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000"],
    stock: 50,
    rating: 4.8
  },
  {
    id: "2",
    name: "Zenith Minimalist Watch",
    price: 150.00,
    category: "Accessories",
    description: "A sleek, titanium-body watch with a sapphire glass face and genuine leather strap.",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000"],
    stock: 25,
    rating: 4.5
  },
  {
    id: "3",
    name: "Aero Peak Running Shoes",
    price: 120.00,
    category: "Footwear",
    description: "Lightweight, breathable running shoes designed for maximum speed and comfort.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000"],
    stock: 100,
    rating: 4.2
  },
  {
    id: "4",
    name: "Quantum Glass Smart Lamp",
    price: 89.00,
    category: "Home Decor",
    description: "Minimalist smart lamp with 16 million colors and voice control integration.",
    images: ["https://www.bigw.com.au/medias/sys_master/images/images/hb1/h0b/86559070847006.jpg"],
    stock: 40,
    rating: 4.7
  },

  // Apparel Section
  {
    id: "9",
    name: "Classic White Linen Shirt",
    price: 55.00,
    category: "Apparel",
    description: "Breathable, high-quality linen shirt perfect for summer evenings and casual professional looks.",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000"],
    stock: 80,
    rating: 4.6
  },
  {
    id: "10",
    name: "Slim Fit Navy Chinos",
    price: 65.00,
    category: "Apparel",
    description: "Versatile slim-fit trousers made from premium stretch-cotton for all-day comfort.",
    images: ["https://tse2.mm.bing.net/th/id/OIP.S62kh2wLLSQRn0qMst7DqwHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"],
    stock: 45,
    rating: 4.7
  },
  {
    id: "11",
    name: "Denim Straight Leg Jeans",
    price: 85.00,
    category: "Apparel",
    description: "Timeless straight-leg denim with a vintage wash and reinforced stitching.",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000"],
    stock: 55,
    rating: 4.5
  },
  {
    id: "12",
    name: "Urban Performance Hoodie",
    price: 75.00,
    category: "Apparel",
    description: "Premium heavyweight fleece hoodie with a modern athletic cut.",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000"],
    stock: 35,
    rating: 4.8
  },

  // Remaining Products
  {
    id: "5",
    name: "Arcane Leather Backpack",
    price: 180.00,
    category: "Accessories",
    description: "Handcrafted full-grain leather backpack with a dedicated 16-inch laptop compartment.",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000"],
    stock: 15,
    rating: 4.9
  },
  {
    id: "6",
    name: "Vertex Mechanical Keyboard",
    price: 135.00,
    category: "Electronics",
    description: "Tactile mechanical keyboard with hot-swappable switches and customizable RGB lighting.",
    images: ["https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000"],
    stock: 30,
    rating: 4.6
  },
  {
    id: "7",
    name: "Solaris Outdoor Grill",
    price: 450.00,
    category: "Outdoor",
    description: "Portable solar-assisted hybrid grill for the ultimate eco-friendly camping experience.",
    images: ["https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000"],
    stock: 10,
    rating: 4.4
  },
  {
    id: "8",
    name: "Echo Wireless Speaker",
    price: 199.00,
    category: "Electronics",
    description: "360-degree immersive sound with deep bass and waterproof design.",
    images: ["https://ae01.alicdn.com/kf/Sf10449c36d0846488c9a97b539f51374Z.jpg"],
    stock: 60,
    rating: 4.3
  }
];


  // Auth
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    
    // Simple authentication logic for demo
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (email === "admin@lumina.com") {
      return res.json({
        user: { id: "admin_id", name: "System Admin", email, isAdmin: true },
        token: "dummy-admin-jwt-token-" + Date.now()
      });
    } else if (email === "user@example.com" || email.includes("@")) {
      const name = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
      return res.json({
        user: { id: "user_id_" + Date.now(), name: name || "Member", email, isAdmin: false },
        token: "dummy-user-jwt-token-" + Date.now()
      });
    }

    res.status(401).json({ message: "Invalid credentials" });
  });

  app.post("/api/auth/signup", (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password.length >= 6) {
      res.json({
        user: { id: "user_id_" + Date.now(), name, email, isAdmin: false },
        token: "dummy-signup-jwt-token-" + Date.now()
      });
    } else {
      res.status(400).json({ message: "Invalid data provided" });
    }
  });

  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
  });

  app.post("/api/products", (req, res) => {
    const newProduct = { ...req.body, id: Date.now().toString() };
    products.push(newProduct);
    res.status(201).json(newProduct);
  });

  app.put("/api/products/:id", (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
      products[index] = { ...products[index], ...req.body };
      res.json(products[index]);
    } else res.status(404).json({ message: "Product not found" });
  });

  app.delete("/api/products/:id", (req, res) => {
    products = products.filter(p => p.id !== req.params.id);
    res.json({ message: "Deleted successfully" });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
