import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transform hover:scale-105 active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `;
  
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-500 to-indigo-600
      hover:from-blue-600 hover:to-indigo-700
      text-white shadow-md hover:shadow-lg
      focus:ring-blue-500
    `,
    secondary: `
      bg-gradient-to-r from-gray-100 to-gray-200
      hover:from-gray-200 hover:to-gray-300
      text-gray-800 shadow-sm hover:shadow-md
      focus:ring-gray-400
    `,
    outline: `
      border-2 border-blue-500 text-blue-600
      hover:bg-blue-50 hover:border-blue-600 hover:text-blue-700
      focus:ring-blue-500
    `,
    ghost: `
      text-gray-700 hover:bg-gray-100
      focus:ring-gray-400
    `,
    success: `
      bg-gradient-to-r from-emerald-500 to-teal-600
      hover:from-emerald-600 hover:to-teal-700
      text-white shadow-md hover:shadow-lg
      focus:ring-emerald-500
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-pink-600
      hover:from-red-600 hover:to-pink-700
      text-white shadow-md hover:shadow-lg
      focus:ring-red-500
    `,
  };

  const sizes = {
    xs: 'px-2 py-1 text-xs rounded-lg',
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-xl',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-2xl',
  };

  const iconSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      <span className={`
        inline-flex items-center
        ${loading ? 'opacity-0' : 'opacity-100'}
        transition-opacity duration-200
      `}>
        {icon && !loading && (
          <FontAwesomeIcon
            icon={icon}
            className={`
              ${children ? 'mr-2' : ''}
              ${iconSizes[size]}
              transition-transform duration-200
              group-hover:scale-110
            `}
          />
        )}
        {children}
      </span>
      
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className={`
              animate-spin
              ${iconSizes[size]}
            `}
          />
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'success', 'danger']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  icon: PropTypes.object,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button; 