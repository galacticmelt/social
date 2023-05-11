import { Server } from 'socket.io';
import http from 'http';

const socketServer = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.ALLOWED_ORIGINS!.split(', ')
    }
  });
  
  type User = {
    userId: string;
    socketId: string;
  }
  
  let users: User[] = [];
  
  const addUser = (userId: string, socketId: string) => {
    !users.some(user => user.userId === userId) && 
      users.push({userId, socketId})
  }
  const removeUser = (socketId: string) => {
    const filtered = users.filter((user) => user.socketId !== socketId);
    users = filtered
  }
  
  io.on('connection', (socket) => {
    console.log(`${socket.id} connected`)
  
    socket.on('addUser', (userId) => {
      addUser(userId, socket.id)
      console.log(users)
      io.emit('getUsers', users)
    })
    socket.on('sendMessage', (message) => {
      console.log(message);
      io.to(message.users[0]).to(message.users[1]).emit(
        'newMessage',
        message.message
      )
    })
    socket.on('contactsUpdate', ({receiverId, initiatorId, updateType}) => {
      console.log(`rec ${receiverId} init ${initiatorId} type ${updateType}`)
      if (updateType === 'delete') {
        io.to(receiverId).emit('contactsChanged', {updateType: 'delete', initiatorId})
        return;
      }
      io.to(receiverId).emit('contactsChanged', {updateType: 'add', initiatorId: ''})
    })
    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`)
      removeUser(socket.id);
      io.emit('getUsers', users);
    })
  })
}

export default socketServer;

