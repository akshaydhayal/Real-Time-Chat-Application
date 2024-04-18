# Real-Time Chat MERN Web Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Live Deployment](#live-deployment)
- [Website Demo](#website-demo)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a real-time chat application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It enables users to engage in real-time conversations, send friend requests, accept or reject friend requests, send files along with chat messages, and receive notification alerts for new messages.

## Features

1. **Real-Time Chat**: Enable users to communicate with each other in real-time using Socket.IO.
2. **Friend Requests**: Users can search for other users and send friend requests to connect with them.
3. **Friend Requests Management**: Users have the option to accept or reject incoming friend requests.
4. **File Sharing**: Users can send files along with chat messages, implemented using Multer for file uploads and Cloudinary for storing file data.
5. **Notification Alerts**: Users receive notification alerts for new messages.
6. **User Authentication**: Login and registration functionality using cookie-based authentication.

## Technologies Used

### Frontend Client
- React.js
- Tailwind CSS

### Backend Server
- Node.js
- Express.js
- Socket.IO

### Database
- MongoDB
- Cloudinary (for storing user files)

## Live Deployment

[Link to Live Deployment](link_to_live_deployment)

## Website Demo

[![Website Demo](link_to_website_demo_image)](link_to_website_demo_video)

## Setup

1. **Clone the Repository**: `git clone https://github.com/yourusername/your-repository.git`
2. **Install Dependencies**: `cd your-repository` then `npm install` in both the client and server directories.
3. **Environment Variables**: Set up environment variables for MongoDB connection URI, Cloudinary configuration, and other necessary variables.
4. **Start the Development Server**: Run `npm start` in both the client and server directories.

## Usage

1. **Register/Login**: Users can register for a new account or login using their credentials.
2. **Search Users**: Users can search for other users using the search functionality.
3. **Send Friend Requests**: After finding another user, they can send friend requests.
4. **Manage Friend Requests**: Users can accept or reject incoming friend requests.
5. **Real-Time Chat**: Engage in real-time conversations with connected users.
6. **File Sharing**: Send files along with chat messages by selecting files from your device.
7. **Notification Alerts**: Receive notification alerts for new messages.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request.

## License

[License Name](link_to_license)
