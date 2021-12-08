import Socket from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export const commentMiddleware = (socket: Socket.Socket, next: (err?: ExtendedError | undefined) => void) => {
    console.log(socket.handshake);
    next();
};
export const commentListener = (socket: Socket.Socket) => {
    console.log("connect");
};