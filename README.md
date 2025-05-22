# LinkVault Backend

> **Note**: This is the backend repository of LinkVault. The frontend code can be found at [LinkVault Frontend](https://github.com/brijrajparmar27/LinkVault-frontend).

LinkVault is a powerful link management solution that helps users save, organize, and access their important links with ease. This repository contains the backend implementation of LinkVault, providing a robust API for the frontend application.

## Features

- 🔐 **Secure Authentication**: JWT-based user authentication system
- 🔗 **Link Management**: RESTful API for saving and organizing links
- 🖼️ **Automatic Thumbnails**: Thumbnail generation using Puppeteer
- 🔄 **Real-time Updates**: Socket.IO integration for real-time notifications
- 🛡️ **Security**: Password hashing with bcrypt
- 🌐 **CORS Enabled**: Cross-origin resource sharing support
- 📱 **RESTful API**: Clean and intuitive API endpoints

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database with Mongoose ODM
- **Socket.IO**: Real-time communication
- **Puppeteer**: Thumbnail generation
- **JWT**: Authentication
- **bcrypt**: Password hashing
- **CORS**: Cross-origin resource sharing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/brijrajparmar27/LinkVault-backend.git
   cd LinkVault-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   PORT=5000
   MONGO=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### User Routes

- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login user
- `GET /api/user/profile` - Get user profile (protected)

### Link Routes

- `POST /api/links` - Create a new link
- `GET /api/links` - Get all links for a user
- `PUT /api/links/:id` - Update a link
- `DELETE /api/links/:id` - Delete a link

## Project Structure

```
├── controllers/     # Route controllers
├── models/         # Database models
├── routes/         # API routes
├── helpers/        # Utility functions
├── index.js        # Entry point
└── package.json    # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Brijrajsinh Parmar - brijrajparmaromegab32@gmail.com

Project Links:

- Frontend: [LinkVault Frontend](https://github.com/brijrajparmar27/LinkVault-frontend)
- Backend: [LinkVault Backend](https://github.com/brijrajparmar27/LinkVault-backend)

---

⭐️ If you like this project, please give it a star on GitHub!
