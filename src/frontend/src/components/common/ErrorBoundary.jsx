import React from 'react';
import { toast } from 'react-toastify';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false, 
            error: null, 
            errorInfo: null 
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Error caught by boundary:', error);
            console.error('Error info:', errorInfo);
        }

        // Log error to external service in production
        if (process.env.NODE_ENV === 'production') {
            this.logErrorToService(error, errorInfo);
        }

        // Show toast notification
        toast.error('Something went wrong. Please try refreshing the page.');

        this.setState({
            error,
            errorInfo
        });
    }

    logErrorToService = (error, errorInfo) => {
        // Here you would integrate with error logging services like Sentry, LogRocket, etc.
        console.log('Logging error to service:', { error, errorInfo });
    }

    handleRetry = () => {
        this.setState({ 
            hasError: false, 
            error: null, 
            errorInfo: null 
        });
    }

    render() {
        if (this.state.hasError) {
            // Custom error UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div className="text-center">
                            <div className="mx-auto h-24 w-24 text-red-500 mb-6">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                                Oops! Something went wrong
                            </h2>
                            <p className="text-gray-600 mb-8">
                                We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
                            </p>
                            
                            <div className="space-y-4">
                                <button
                                    onClick={this.handleRetry}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    Try Again
                                </button>
                                
                                <button
                                    onClick={() => window.location.reload()}
                                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    Refresh Page
                                </button>
                            </div>

                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <details className="mt-8 text-left">
                                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                                        Error Details (Development Only)
                                    </summary>
                                    <div className="mt-4 p-4 bg-gray-100 rounded-md overflow-auto">
                                        <h4 className="font-semibold text-red-600 mb-2">Error:</h4>
                                        <pre className="text-xs text-gray-800 whitespace-pre-wrap mb-4">
                                            {this.state.error.toString()}
                                        </pre>
                                        {this.state.errorInfo.componentStack && (
                                            <>
                                                <h4 className="font-semibold text-red-600 mb-2">Component Stack:</h4>
                                                <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                                                    {this.state.errorInfo.componentStack}
                                                </pre>
                                            </>
                                        )}
                                    </div>
                                </details>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// HOC for wrapping components with error boundary
export const withErrorBoundary = (Component, fallback) => {
    return function WrappedComponent(props) {
        return (
            <ErrorBoundary fallback={fallback}>
                <Component {...props} />
            </ErrorBoundary>
        );
    };
};

// Hook for error boundary functionality in functional components
export const useErrorHandler = () => {
    const [error, setError] = React.useState(null);

    const resetError = () => setError(null);

    const captureError = (error) => {
        setError(error);
        
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Error captured:', error);
        }

        // Show toast notification
        toast.error('An error occurred. Please try again.');
    };

    React.useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    return { captureError, resetError };
};

export default ErrorBoundary;
