# Realtime Chat Application




## Deployment

To create the image 
```bash
  docker build -t chatting-app .
```
To run the container from image
```bash
  docker run -d -p 4000:4000 chatting-app
```
To get access of the website just hit the following url in the browser
```bash
  http://localhost:4000
```

## Technologies Utilized:
# Socket.io 🚀: Enables real-time, bidirectional, and event-based communication, forming the backbone of this application.
# Node.js and Express.js 🛠️: Power the server, ensuring fast and scalable network applications.
# Docker 🐳: Containerizes the application for easy deployment and portability.

## How It Works:
Server Setup: Node.js and Express.js form the foundation of the server, handling HTTP requests and serving static files. Socket.io is seamlessly integrated for real-time communication.

Client-Side (app.js): Upon connection, users are prompted to input their name, which serves as their username. Messages can be sent by clicking the "send" button or pressing "Enter". Socket.io facilitates message transmission to the server, which then broadcasts it to all connected clients.

Creating and Joining Rooms: Users can create new rooms by specifying a name. The server manages room creation and notifies all connected clients of the new addition.

Updating Chat Display: Messages are elegantly displayed, showcasing the sender's name and message content. System announcements, marked as "INFO", provide essential updates such as room join/leave notifications.

User List and Room List: These dynamic lists keep users informed about the active participants and available rooms. The server efficiently manages these lists.

Changing Rooms: Users can seamlessly switch between rooms by selecting from the available options in the room list. This action updates the user's current room.

Handling Disconnections: When a user disconnects, they are gracefully removed from the list of active users, and remaining users receive timely notifications.
