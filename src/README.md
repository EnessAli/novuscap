# 🚀 NovusCap - Entrepreneurship Ecosystem Platform

[![Production Ready](https://img.shields.io/badge/Production-Ready-green.svg)](https://github.com/novuscap)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](https://github.com/novuscap)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🎯 Overview

NovusCap, Türkiye'deki girişimcilik ekosistemini dijitalleştiren modern bir web platformudur. Yatırımcılar, startup'lar, Ar-Ge merkezleri, teknoparlar, inkübatörler, topluluklar ve ortak çalışma alanlarını harita üzerinde görselleştiren ve yönetilebilen kapsamlı bir çözüm sunar.

## ⭐ Key Features

### 🗺️ Interactive Map Interface
- **Google Maps Integration**: Advanced map functionality with custom markers
- **Real-time Organization Visualization**: Dynamic markers with type-based styling
- **Location Services**: User geolocation, address search, distance calculations
- **Advanced Filtering**: By organization type, location, radius-based proximity

### 🔐 Secure Authentication System
- **JWT-based Authentication**: Secure login/logout with token refresh
- **Role-based Access Control**: Admin and user role management
- **Protected Routes**: Secure access to sensitive operations

### 📊 Organization Management
- **Full CRUD Operations**: Create, read, update, delete organizations
- **Rich Data Management**: Comprehensive organization profiles
- **Admin Panel**: Complete administrative interface
- **Analytics Dashboard**: Insights and reporting

### 🎨 Modern User Experience
- **Responsive Design**: Mobile-first, works on all devices
- **Tailwind CSS**: Modern, utility-first styling
- **Real-time Updates**: Live data synchronization
- **Error Handling**: Comprehensive error management and user feedback

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern functional components with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Accessible UI components
- **Google Maps React** - Interactive map integration
- **React Query** - Server state management
- **React Router** - Client-side routing

### Backend
- **ASP.NET Core 8** - Cross-platform web API
- **Entity Framework Core** - ORM for database operations
- **PostgreSQL** - Robust relational database
- **JWT Authentication** - Secure token-based auth
- **Swagger/OpenAPI** - API documentation

### DevOps & Deployment
- **Docker** - Containerization for consistent deployments
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and static file serving
- **GitHub Actions** - CI/CD pipeline (ready)

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Git
- Node.js 18+ (for development)
- .NET 8 SDK (for development)

### ⚡ Super Fast Docker Setup (Recommended)
> **🐳 2-minute setup with unified Docker environment**

```powershell
# 1. Clone and setup environment
git clone [repository-url]
cd novuscap
cp .env.example .env
# Edit .env with your values

# 2. Start everything with one command
docker-compose up -d

# 3. Access applications
# Frontend: http://localhost:3000
# Backend API: http://localhost:5002/api
# Admin Panel: admin@novuscap.com / Admin123!
```

**Quick Docker Commands:**
```bash
# Start all services (development)
docker-compose up -d

# Start all services (production)
docker-compose --profile production up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up -d --build
```

### 🎯 Visual Studio 2022 Development (Alternative)
> **⚡ 5-minute setup for Visual Studio 2022 developers**

#### Option 1: One-Click Launcher
```bash
# Double-click to run:
launch_vs2022.bat
```

#### Option 2: Manual Setup
**Quick Start:** See [QUICK_START_VS2022.md](QUICK_START_VS2022.md) for instant setup
**Detailed Guide:** See [VISUAL_STUDIO_SETUP.md](VISUAL_STUDIO_SETUP.md) for comprehensive instructions

```bash
# 1. Open solution file:
# Double-click: NovusCap.sln

# 2. Start backend (F5 in Visual Studio)
# 3. Start frontend:
cd frontend && npm install && npm start
```

#### Option 3: PowerShell Advanced Setup
```powershell
# Run as Administrator:
.\setup_vs2022.ps1

# Test integration:
.\test_integration.ps1
```

### Production Deployment (Docker - Recommended for Production)

1. **Clone the repository**
```bash
git clone <repository-url>
cd novuscap
```

2. **Configure environment variables**
```bash
# Copy and edit environment files
cp frontend/.env.example frontend/.env.production
cp backend/.env.example backend/.env

# Edit the files with your configuration
```

3. **Deploy with Docker Compose**
```bash
# Build and start all services
docker-compose up -d --build

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/swagger

### Development Setup

#### Frontend Development
```bash
cd frontend
npm install
npm start
```

#### Backend Development
```bash
cd backend/src/NovusCap.WebApi
dotnet restore
dotnet run
```

## 📁 Project Structure

```
novuscap/
├── 📁 frontend/                 # React application
│   ├── 📁 src/
│   │   ├── 📁 components/       # Reusable UI components
│   │   ├── 📁 pages/           # Page components
│   │   ├── 📁 services/        # API service layer
│   │   ├── 📁 contexts/        # React context providers
│   │   ├── 📁 hooks/           # Custom React hooks
│   │   └── 📁 __tests__/       # Test files
│   ├── 🐳 Dockerfile           # Frontend container config
│   └── ⚙️ nginx.conf           # Nginx configuration
├── 📁 backend/                 # .NET Core API
│   ├── 📁 src/
│   │   ├── 📁 NovusCap.WebApi/ # Web API project
│   │   ├── 📁 NovusCap.Application/ # Business logic
│   │   ├── 📁 NovusCap.Infrastructure/ # Data access
│   │   └── 📁 NovusCap.Domain/ # Domain models
│   └── 🐳 Dockerfile           # Backend container config
├── 📁 config/                  # Configuration files
│   ├── 📁 docker/              # Docker configurations
│   ├── 📁 nginx/               # Nginx configurations
│   └── 📁 env/                 # Environment files
├── 📁 docs/                    # Project documentation
│   ├── 📁 api/                 # API documentation
│   ├── 📁 deployment/          # Deployment guides
│   ├── 📁 setup/               # Setup instructions
│   └── 📁 reports/             # Project reports
├── 🐳 docker-compose.yml       # Container orchestration
└── 📊 NovusCap.sln             # Visual Studio solution
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.production)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_ENVIRONMENT=production
```

#### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=postgres;Database=novuscapdb;Username=postgres;Password=your_password"
  },
  "Jwt": {
    "SecretKey": "your_secure_secret_key",
    "Issuer": "NovusCap",
    "Audience": "NovusCapUsers"
  },
  "GoogleMaps": {
    "ApiKey": "your_google_maps_api_key"
  }
}
```

## 🧪 Testing

### Run Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

### Run Backend Tests
```bash
cd backend
dotnet test
```

### Integration Tests
```bash
# Test API connectivity
curl http://localhost:5000/health

# Test frontend accessibility  
curl http://localhost:3000
```

## 📊 API Documentation

API documentation is available via Swagger UI:
- **Local**: http://localhost:5000/swagger
- **Production**: https://your-domain.com/swagger

Key endpoints:
- `GET /api/organizations` - List organizations
- `POST /api/auth/login` - User authentication
- `GET /api/map/organizations` - Map data
- `GET /health` - Health check

## 🔐 Security Features

- **JWT Authentication** with secure token management
- **CORS Policy** configured for production domains
- **Input Validation** and sanitization
- **SQL Injection Prevention** via EF Core
- **XSS Protection** headers
- **Rate Limiting** for API endpoints

## 📈 Performance Optimizations

- **Frontend**: Code splitting, lazy loading, optimized builds
- **Backend**: Database indexing, connection pooling, caching
- **Infrastructure**: Nginx reverse proxy, Docker optimization
- **Maps**: Efficient marker clustering and data loading

## 🔄 Monitoring & Health Checks

### Health Endpoints
- **Backend**: `/health` - API health status
- **Frontend**: Built-in system status dashboard
- **Database**: Connection and query performance monitoring

### System Status Dashboard
Access comprehensive system monitoring at: `/system-status`

## 📖 Documentation

- **[Deployment Guide](docs/deployment/DEPLOYMENT.md)** - Complete deployment instructions
- **[Production Checklist](docs/deployment/PRODUCTION_CHECKLIST.md)** - Go-live verification
- **[API Documentation](docs/api/API.md)** - Detailed API reference
- **[User Stories](docs/setup/USER_STORIES.md)** - Feature specifications
- **[Quick Start Guide](docs/setup/QUICK_START_VS2022.md)** - Fast development setup
- **[Project Status](docs/reports/PROJECT_STATUS.md)** - Current completion status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the `docs/` folder
- Review the troubleshooting guide in `docs/deployment/DEPLOYMENT.md`

## 🎉 Project Status

**✅ PRODUCTION READY**

All major features have been implemented and tested:
- ✅ Frontend-Backend Integration
- ✅ Google Maps API Integration
- ✅ Production Deployment Configuration
- ✅ Comprehensive Testing
- ✅ Security Hardening
- ✅ Performance Optimization
- ✅ Documentation Complete

---

**Built with ❤️ for the Turkish entrepreneurship ecosystem**
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env
├── docker-compose.yml
├── .github
│   └── workflows
│       └── ci-cd.yml
---

**⭐ If you find this project helpful, please give it a star!**

**🚀 Ready for Production - All systems go!**