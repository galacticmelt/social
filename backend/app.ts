import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from "cookie-parser";
import socketServer from './socketServer.js';
import { connectDB } from './src/db.js';
import usersRouter from './src/routes/users.routes.js';
import authRouter from './src/routes/auth.routes.js';
import chatsRouter from './src/routes/chats.routes.js';
import messagesRouter from './src/routes/messages.routes.js';
import postsRouter from './src/routes/posts.routes.js'
import { globalErrorHandler } from './src/middleware/globalErrorHandler.js';
import { resourceNotFoundHandler } from './src/middleware/resourceNotFoundHandler.js';
import dotenv from 'dotenv'
dotenv.config();

const app = express()
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS!.split(', '),
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/chats', chatsRouter)
app.use('/messages', messagesRouter)
app.use('/posts', postsRouter)

app.use(resourceNotFoundHandler)
app.use(globalErrorHandler)

if (process.env.NODE_ENV !== 'test') {
  socketServer(server)
  connectDB()
  const port = process.env.PORT || 3000
  server.listen(port, () => {
    console.log(`server running at port ${port}`);
  });
}

export default app;




