<div align="center">

# The Express Boilerplate

🚀 A production-ready Express.js boilerplate with TypeScript, Prisma, and PostgreSQL

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.19-green.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.18-orange.svg)](https://www.prisma.io/)
[![Jest](https://img.shields.io/badge/Jest-29.7-red.svg)](https://jestjs.io/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

</div>

## ✨ Features

### 🛠 Core Technologies
- **[Express.js](https://expressjs.com/)** - Fast, unopinionated, minimalist web framework
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript with syntax for types
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM for Node.js and TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Advanced open-source relational database

### 🔒 Security & Performance
- **[Helmet](https://helmetjs.github.io/)** - Secure Express apps with various HTTP headers
- **[CORS](https://github.com/expressjs/cors)** - Cross-Origin Resource Sharing middleware
- **[Rate Limiting](https://github.com/express-rate-limit/express-rate-limit)** - Basic rate-limiting middleware
- **[Express Basic Auth](https://github.com/LionC/express-basic-auth)** - Simple basic auth middleware

### 📊 Monitoring & Logging
- **[Morgan](https://github.com/expressjs/morgan)** - HTTP request logger
- **[Winston](https://github.com/winstonjs/winston)** - Multi-transport async logging
- **[Prometheus](https://prometheus.io/)** - Monitoring and alerting toolkit
- **[Grafana Loki](https://grafana.com/oss/loki/)** - Log aggregation system

### 🧪 Development & Testing
- **[Jest](https://jestjs.io/)** - Delightful JavaScript Testing Framework
- **[ESLint](https://eslint.org/)** - Pluggable linting utility
- **[Prettier](https://prettier.io/)** - Opinionated code formatter
- **[Nodemon](https://nodemon.io/)** - Auto-reload during development

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- Redis (optional, for caching)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/the-express-boilerplate.git
cd the-express-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.development .env
```

4. Start the development server:
```bash
npm run dev:start
```

## 📁 Project Structure

```
├── src/
│   ├── __tests__/       # Test files
│   ├── config/         # Configuration files
│   ├── helpers/        # Helper functions and constants
│   ├── loaders/        # Startup process modules
│   ├── middleware/     # Custom middleware
│   ├── routes/         # API routes
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── bootstrap.ts    # Application bootstrap
│   └── server.ts       # Server entry point
├── prisma/            # Prisma schema and migrations
└── docker/            # Docker configuration files
```

## 🛠 Development

### Available Scripts

- `npm run dev:start` - Start the development server with hot-reload
- `npm run build` - Build the project
- `npm run prod:start` - Start the production server
- `npm test` - Run tests

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# JWT
JWT_SECRET=your-secret-key

# Redis
REDIS_URL="redis://localhost:6379"
```

## 🐳 Docker Support

Build and run with Docker Compose:

```bash
docker-compose up --build
```

## 📈 Monitoring

This boilerplate includes:
- Prometheus metrics at `/metrics`
- Grafana Loki for log aggregation
- Response time monitoring
- Custom metrics support

## 🧪 Testing

Run tests with Jest:

```bash
npm test
```

Test files are located in `src/__tests__/`

## 📜 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📫 Support

For support, please open an issue in the GitHub repository.
