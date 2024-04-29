import "dotenv/config";
import express from "express";
import BlogModel from "./models/blog";

const app = express();

app.get("/", async (req, res) => {
  const blogs = await BlogModel.find().exec();
  res.status(200).json(blogs);
});

export default app;
