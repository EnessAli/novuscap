# 🚀 NovusCap Production Deployment Checklist

## ✅ PRE-DEPLOYMENT CHECKLIST

### 🔧 Environment Configuration
- [ ] **Backend appsettings.json configured**
  - Database connection string updated
  - JWT settings configured
  - Google Maps API key set
  - CORS policy configured
- [ ] **Frontend .env.production configured**
  - API URL set to production backend
  - Google Maps API key configured
  - Environment flags set
- [ ] **Docker configuration ready**
  - Dockerfile tested for both frontend/backend
  - docker-compose.yml configured
  - Volumes and networks defined

### 🗄️ Database Preparation
- [ ] **PostgreSQL setup**
  - Database created: `novuscapdb`
  - User created with proper permissions
  - Connection tested
- [ ] **Schema migration**
  - Entity Framework migrations applied
  - Test data loaded (if needed)

### 🔐 Security Configuration
- [ ] **JWT Security**
  - Secret key is 32+ characters
  - Expiration time configured
  - Issuer/Audience set properly
- [ ] **API Security**
  - CORS configured for production domains
  - HTTPS enforced
  - Rate limiting configured
- [ ] **Frontend Security**
  - Source maps disabled in production
  - Environment variables secured
  - CSP headers configured

## 🧪 TESTING CHECKLIST

### 🔌 Backend API Tests
- [ ] **Health check endpoint**: `GET /health`
- [ ] **Authentication endpoints**
  - `POST /api/auth/login`
  - `POST /api/auth/register`
  - `POST /api/auth/refresh`
- [ ] **Organization endpoints**
  - `GET /api/organizations`
  - `POST /api/organizations`
  - `PUT /api/organizations/{id}`
  - `DELETE /api/organizations/{id}`
- [ ] **Map endpoints**
  - `GET /api/map/organizations`
  - `GET /api/map/nearby`

### 🗺️ Frontend Integration Tests
- [ ] **Google Maps Integration**
  - Map loads correctly
  - Markers display
  - User location detection
  - Search functionality
  - Distance calculations
- [ ] **API Integration**
  - Login/logout flow
  - Organization CRUD operations
  - Map data loading
  - Error handling

### 🎯 Performance Tests
- [ ] **Frontend Performance**
  - Build size optimized
  - Lazy loading implemented
  - Image optimization
  - Bundle analysis completed
- [ ] **Backend Performance**
  - Database queries optimized
  - Caching implemented
  - Connection pooling configured

## 🚀 DEPLOYMENT STEPS

### 1. Pre-deployment Verification
```bash
# 1. Verify all environment variables
cat frontend/.env.production
cat backend/src/NovusCap.WebApi/appsettings.json

# 2. Test database connection
psql -h localhost -U postgres -d novuscapdb -c "SELECT 1;"

# 3. Build and test locally
cd frontend && npm run build
cd backend/src/NovusCap.WebApi && dotnet build -c Release
```

### 2. Docker Deployment
```bash
# 1. Build all containers
docker-compose build --no-cache

# 2. Start services
docker-compose up -d

# 3. Verify all services are running
docker-compose ps

# 4. Check health endpoints
curl -f http://localhost:5000/health
curl -f http://localhost:3000
```

### 3. Database Migration
```bash
# Run migrations in backend container
docker-compose exec backend dotnet ef database update
```

### 4. Post-deployment Verification
```bash
# 1. Health checks
curl -f http://localhost:5000/health
curl -f http://localhost:5000/api/organizations

# 2. Frontend accessibility
curl -f http://localhost:3000

# 3. Integration test
# Navigate to http://localhost:3000 and verify:
# - Login functionality
# - Map loads with organizations
# - Google Maps API working
# - Search and filter functionality
```

## 📊 MONITORING & HEALTH CHECKS

### 🔍 Health Check Endpoints
- **Backend API**: `http://localhost:5000/health`
- **Database**: PostgreSQL connection check
- **Frontend**: HTTP 200 response on root path

### 📈 Monitoring Tools
```bash
# Docker container monitoring
docker-compose logs -f

# System resource monitoring
docker stats

# Database monitoring
docker-compose exec postgres pg_stat_activity
```

### 🚨 Alert Thresholds
- **API Response Time**: > 500ms
- **Database Connection**: Connection errors
- **Container Health**: Container restart events
- **Disk Usage**: > 80%
- **Memory Usage**: > 80%

## 🔄 ROLLBACK PROCEDURE

### Emergency Rollback
```bash
# 1. Stop current deployment
docker-compose down

# 2. Restore previous version
git checkout <previous-stable-commit>
docker-compose up -d --build

# 3. Verify rollback success
curl -f http://localhost:5000/health
```

### Database Rollback
```bash
# Restore database from backup
docker-compose exec postgres psql -U postgres -d novuscapdb < backup.sql
```

## 📝 POST-DEPLOYMENT VERIFICATION

### ✅ Manual Testing Checklist
- [ ] **Frontend loads correctly**
- [ ] **User can register/login**
- [ ] **Map displays organizations**
- [ ] **Google Maps features work**
  - Location detection
  - Search functionality  
  - Marker interactions
  - Distance calculations
- [ ] **Admin panel accessible (if applicable)**
- [ ] **Mobile responsiveness**
- [ ] **Performance acceptable**

### 🔧 System Status Dashboard
Access system status at: `http://localhost:3000/system-status`
- [ ] All health checks green
- [ ] API connectivity verified
- [ ] Google Maps API loaded
- [ ] Environment variables configured
- [ ] Performance optimizations active

## 📞 SUPPORT & TROUBLESHOOTING

### Common Issues
1. **Port conflicts**: Check if ports 3000, 5000, 5432 are available
2. **Database connection**: Verify PostgreSQL is running and accessible
3. **Google Maps not loading**: Check API key and billing account
4. **CORS errors**: Verify allowed origins in backend configuration
5. **Build failures**: Check Node.js/npm versions and dependencies

### Debug Commands
```bash
# Container logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres

# Container shell access
docker-compose exec backend bash
docker-compose exec frontend sh
docker-compose exec postgres psql -U postgres
```

---

## 🎯 SUCCESS CRITERIA

**Deployment is successful when:**
- [ ] All containers are running healthy
- [ ] Frontend accessible at http://localhost:3000
- [ ] Backend API responding at http://localhost:5000
- [ ] Database migrations completed
- [ ] Google Maps integration working
- [ ] All health checks passing
- [ ] System status dashboard shows all green
- [ ] Manual testing checklist completed

**Date Completed:** ___________  
**Deployed By:** ___________  
**Version:** ___________
