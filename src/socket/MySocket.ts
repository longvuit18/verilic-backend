import Socket from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export class MySocket {

    private io: Socket.Server;
    private namespace: Socket.Namespace;
    private listener: (socket: Socket.Socket) => void;
    private middleware: (socket: Socket.Socket, next: (err?: ExtendedError | undefined) => void) => void;

    /**
     * 
     * @param io Socket server of node js
     * @param namespace namespace of socket server
     * @param listener listener of namespace that can listener all event in namespace
     * @param middleware middleware of namespace 
     */
    constructor(io: Socket.Server, namespace: string, listener: (socket: Socket.Socket) => void, middleware: (socket: Socket.Socket, next: (err?: ExtendedError | undefined) => void) => void) {
        this.io = io;
        this.listener = listener;
        this.middleware = middleware;
        this.namespace = this.createNamespace(namespace);

    }

    private createNamespace = (namespace: string) => {
        return this.io.of(namespace);
    }

    public connection = () => {
        this.namespace.on("connection", this.listener);
        this.namespace.use(this.middleware);
    }

}