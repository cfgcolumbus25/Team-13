import React from 'react';
import clsx from 'clsx';

const buttonVariants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-blue-500",
};

const buttonSizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
};

export const Button = React.forwardRef(({
    className,
    variant = "default",
    size = "md",
    disabled = false,
    children,
    ...props
}, ref) => {
    return (
        <button
            className={clsx(
                "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                buttonVariants[variant],
                buttonSizes[size],
                className
            )}
            ref={ref}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";