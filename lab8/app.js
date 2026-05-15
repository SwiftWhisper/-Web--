require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");

// routes
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const authRoutes = require("./routes/authRoutes");

// error stuff
const ApiError = require("./errors/ApiError");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
connectDB();
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API для роботи з постами та коментарями",
    endpoints: {
      posts: "/api/posts",
      comments: "/api/comments",
      registration: "/api/auth/register",
      authentication: "/api/auth/login",
      myProfile: "/api/auth/me",
    },
  });
});
app.use((req, res, next) => {
  next(ApiError.notFound("Маршрут не знайдено"));
});
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущено на порту ${PORT}`));
