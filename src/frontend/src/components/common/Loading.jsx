import React from 'react';
import classNames from 'classnames';

const Loading = ({ 
    size = 'medium', 
    color = 'primary', 
    fullScreen = false, 
    overlay = false,
    text = '',
    className = '' 
}) => {
    const sizeClasses = {
        small: 'w-4 h-4 border-2',
        medium: 'w-8 h-8 border-3',
        large: 'w-12 h-12 border-4',
        xlarge: 'w-16 h-16 border-4'
    };

    const colorClasses = {
        primary: 'border-primary border-t-transparent',
        secondary: 'border-secondary border-t-transparent',
        white: 'border-white border-t-transparent',
        gray: 'border-gray-400 border-t-transparent'
    };

    const spinnerClasses = classNames(
        'inline-block rounded-full animate-spin',
        sizeClasses[size],
        colorClasses[color],
        className
    );

    const containerClasses = classNames(
        'flex flex-col items-center justify-center',
        {
            'fixed inset-0 z-50': fullScreen,
            'bg-black bg-opacity-50': overlay,
            'h-screen': fullScreen && !overlay,
            'min-h-[200px]': !fullScreen
        }
    );

    return (
        <div className={containerClasses}>
            <div className={spinnerClasses}></div>
            {text && (
                <p className={classNames(
                    'mt-4 text-sm font-medium',
                    {
                        'text-white': overlay,
                        'text-gray-600': !overlay
                    }
                )}>
                    {text}
                </p>
            )}
        </div>
    );
};

// Loading button component
export const LoadingButton = ({ 
    loading = false, 
    children, 
    disabled = false, 
    className = '',
    loadingText = 'Loading...',
    ...props 
}) => {
    return (
        <button 
            className={classNames(
                'relative inline-flex items-center justify-center',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <Loading 
                    size="small" 
                    color="white" 
                    className="mr-2" 
                />
            )}
            {loading ? loadingText : children}
        </button>
    );
};

// Loading overlay component
export const LoadingOverlay = ({ loading = false, children, text = '' }) => {
    return (
        <div className="relative">
            {children}
            {loading && (
                <Loading 
                    fullScreen 
                    overlay 
                    text={text}
                />
            )}
        </div>
    );
};

// Skeleton loading component
export const Skeleton = ({ 
    width = '100%', 
    height = '1rem', 
    className = '',
    rounded = 'rounded' 
}) => {
    return (
        <div 
            className={classNames(
                'bg-gray-200 animate-pulse',
                rounded,
                className
            )}
            style={{ width, height }}
        />
    );
};

// Card skeleton component
export const CardSkeleton = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Skeleton height="1.5rem" width="70%" className="mb-4" />
            <Skeleton height="1rem" width="100%" className="mb-2" />
            <Skeleton height="1rem" width="80%" className="mb-4" />
            <div className="flex space-x-2">
                <Skeleton height="2rem" width="4rem" rounded="rounded-md" />
                <Skeleton height="2rem" width="4rem" rounded="rounded-md" />
            </div>
        </div>
    );
};

export default Loading;