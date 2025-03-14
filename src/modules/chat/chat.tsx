import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import "./Chat.css"; // Import CSS for styling

interface ChatMessage {
    sender: string;
    content: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [messageInput, setMessageInput] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [connected, setConnected] = useState<boolean>(false);
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const connect = () => {
        const client = new Client({
            brokerURL: "ws://localhost:8080/service2/ws",
            onConnect: () => {
                setConnected(true);
                client.subscribe("/topic/public", (message) => {
                    setMessages((prev) => [...prev, JSON.parse(message.body)]);
                });
            },
        });
        client.activate();
        setStompClient(client);
    };

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (stompClient && messageInput.trim()) {
            stompClient.publish({
                destination: "/app/sendMessage",
                body: JSON.stringify({ sender: username, content: messageInput }),
            });
            setMessageInput("");
        }
    };

    return (
        <div className="chat-container">
            {!connected ? (
                <div className="login-container">
                    <h1>Enter Your Name</h1>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <button onClick={connect}>Join Chat</button>
                </div>
            ) : (
                <div className="chat-box">
                    <h2>Real-Time Chat</h2>
                    <div className="messages-container">
                        <ul className="messages-list">
                            {messages.map((msg, index) => (
                                <li key={index} className={msg.sender === username ? "my-message" : "other-message"}>
                                    <strong>{msg.sender}:</strong> {msg.content}
                                </li>
                            ))}
                            <div ref={messagesEndRef}></div>
                        </ul>
                    </div>
                    <form onSubmit={sendMessage} className="input-container">
                        <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Type a message..." />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chat;
