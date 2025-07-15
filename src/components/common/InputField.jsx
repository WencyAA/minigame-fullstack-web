import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const InputField = forwardRef(({
  type = 'text',
  label,
  error,
  icon,
  placeholder,
  className = '',
  containerClassName = '',
  multiline = false,
  rows = 3,
  onChange,
  onKeyDown,
  value,
  disabled = false,
  size = 'md',
  variant = 'default',
  ...props
}, ref) => {
  const baseInputStyles = `
    w-full
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    default: `
      border border-gray-200 focus:border-blue-500 focus:ring-blue-200
      bg-white text-gray-900 placeholder-gray-400
    `,
    filled: `
      border-0 bg-gray-100 focus:bg-white focus:ring-blue-200
      text-gray-900 placeholder-gray-500
    `,
    flushed: `
      border-0 border-b-2 border-gray-200 rounded-none px-0
      focus:border-blue-500 focus:ring-0
      bg-transparent text-gray-900 placeholder-gray-400
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-xl',
    lg: 'px-5 py-3 text-lg rounded-xl',
  };

  const labelSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const inputStyles = `
    ${baseInputStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}
    ${disabled ? 'bg-gray-50' : ''}
    ${className}
  `;

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className={`${containerClassName} relative`}>
      {label && (
        <label className={`
          block font-medium text-gray-700 mb-1.5
          transition-colors duration-200
          ${labelSizes[size]}
          ${error ? 'text-red-500' : ''}
        `}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className={`
            absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
            transition-colors duration-200
            ${error ? 'text-red-400' : 'text-gray-400'}
          `}>
            <FontAwesomeIcon
              icon={icon}
              className={`
                transition-transform duration-200
                ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'}
              `}
            />
          </div>
        )}
        <InputComponent
          ref={ref}
          type={type}
          className={`${inputStyles} ${icon ? 'pl-10' : ''}`}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          disabled={disabled}
          rows={multiline ? rows : undefined}
          {...props}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="text-red-500 animate-pulse"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center space-x-1">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-xs" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

InputField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.object,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'filled', 'flushed']),
};

export default InputField; 