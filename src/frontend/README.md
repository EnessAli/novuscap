# NovusCap Frontend

Modern React frontend application for the NovusCap entrepreneurship ecosystem platform.

## 🚀 Features

- **Modern React Architecture**: Built with React 18, hooks, and functional components
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Authentication System**: Secure JWT-based authentication with refresh tokens
- **Interactive Maps**: Google Maps integration for visualizing organizations
- **Admin Dashboard**: Comprehensive admin panel for managing users and organizations
- **Real-time Notifications**: Toast notifications for user feedback
- **Form Management**: React Hook Form with comprehensive validation
- **API Integration**: Axios-based API client with interceptors
- **State Management**: Context API for global state management
- **Query Management**: React Query for server state management

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **State Management**: Context API + React Query
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Maps**: Google Maps API
- **Icons**: Heroicons
- **Notifications**: React Toastify
- **Build Tool**: Create React App
- **Testing**: Jest + React Testing Library

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── admin/           # Admin-specific components
│   ├── common/          # Shared components
│   └── map/             # Map-related components
├── contexts/            # React contexts
├── pages/               # Page components
├── routes/              # Routing configuration
├── services/            # API services
├── styles/              # Global styles
└── utils/               # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Maps API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in CI mode:
```bash
npm test -- --watchAll=false
```

## 🏗️ Building for Production

Create a production build:
```bash
npm run build
```

The built files will be in the `build/` directory.

## 📱 Features Overview

### Authentication
- User registration and login
- JWT token management with refresh
- Password strength validation
- Protected routes

### Map Integration
- Interactive Google Maps
- Organization markers with details
- Search and filtering
- Location-based queries

### Admin Dashboard
- User management
- Organization management
- Statistics and analytics
- Role-based access control

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interfaces
- Accessible components

## 🎨 Styling Guide

The project uses Tailwind CSS with a custom configuration:

### Colors
- **Primary**: Orange tones (#F57C00)
- **Secondary**: Blue tones (#0D47A1)
- **Success**: Green tones
- **Warning**: Yellow tones
- **Error**: Red tones

### Components
- Cards with soft shadows
- Rounded corners
- Smooth animations
- Glass morphism effects

## 🔧 Configuration

### Environment Variables
- `REACT_APP_API_BASE_URL`: Backend API URL
- `REACT_APP_GOOGLE_MAPS_API_KEY`: Google Maps API key

### Tailwind CSS
Custom configuration includes:
- Extended color palette
- Custom animations
- Utility classes
- Responsive breakpoints

## 📚 API Integration

The frontend communicates with the backend through:
- RESTful API endpoints
- JWT authentication
- Request/response interceptors
- Error handling
- Loading states

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🏢 About NovusCap

NovusCap is a platform for visualizing and connecting Turkey's entrepreneurship ecosystem, helping startups, investors, and other stakeholders discover and collaborate with each other.
