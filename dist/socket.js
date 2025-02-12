"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (fastify) => {
    const nsp = fastify.io.of("/chat"); // Define the namespace
    nsp.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        socket.on("join_room", (data) => {
            socket.join(data.roomId);
            console.log(`User ${socket.id} joined room: ${data.roomId}`);
        });
        socket.on("leaveRoom", (data) => {
            socket.leave(data.roomId);
            console.log(`User ${socket.id} left room: ${data.roomId}`);
        });
        socket.on("send_chat_messages", async (data) => {
            try {
                console.log("Message received for room:", data.roomId);
                socket.broadcast.to(data.roomId).emit("receive_chat_messages", data);
            }
            catch (err) {
                console.error("Error sending message:", err);
                socket.emit("error_saving_message", err);
            }
        });
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
