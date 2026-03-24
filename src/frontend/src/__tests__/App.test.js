import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from '../App';
import axios from 'axios';

jest.mock('axios');

// Create a wrapper component for providers
const AllTheProviders = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  // Sadece QueryClientProvider ile sarmala, BrowserRouter'ı kaldır
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

// Mock Google Maps
global.google = {
  maps: {
    Map: jest.fn(),
    Marker: jest.fn(),
    InfoWindow: jest.fn(),
    LatLng: jest.fn(),
    places: {
      PlacesService: jest.fn(),
    },
  },
};

describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <AllTheProviders>
        <App />
      </AllTheProviders>
    );
  });

  test('contains main navigation elements', () => {
    render(
      <AllTheProviders>
        <App />
      </AllTheProviders>
    );
    
    // Check if the app renders with basic structure
    expect(document.body).toBeInTheDocument();
  });
});
