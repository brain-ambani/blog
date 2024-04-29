import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import BlogModel from "./models/blog";

const app = express();

app.get("/", async (req, res, next) => {
  try {
    // throw new Error("This is an error");
    const blogs = await BlogModel.find().exec();
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  next(Error("End point not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "Internal Server Error";
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  res.status(500).json({ error: errorMessage });
});

export default app;
