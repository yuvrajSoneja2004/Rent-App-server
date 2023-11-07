const express = require("express");
const app = express();
require("./config/db.config");

// Import route files
const userAuthRoutes = require("./routes/Auth.routes");
// const postsRoutes = require('./posts.routes');

// ? MIDDLEWARES

// use middle to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use route files as middleware
app.use("/api/auth", userAuthRoutes);
// app.use('/api/posts', postsRoutes);

// Start your Express server
const port = process.env.SERVERPORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
