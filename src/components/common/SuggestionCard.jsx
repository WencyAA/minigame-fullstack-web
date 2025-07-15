import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SuggestionCard = ({
  title,
  description,
  icon,
  onClick,
  className = '',
  color = 'from-blue-400 to-indigo-500',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        group w-full p-6 rounded-2xl bg-white
        transform transition-all duration-300 ease-in-out
        hover:shadow-xl hover:-translate-y-2
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        relative overflow-hidden
        ${className}
      `}
    >
      {/* Background gradient that appears on hover */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${color} opacity-0
        group-hover:opacity-10 transition-opacity duration-300
      `} />

      <div className="relative flex flex-col items-center text-center space-y-4">
        {icon && (
          <div className={`
            w-16 h-16 rounded-2xl bg-gradient-to-br ${color}
            flex items-center justify-center
            transform transition-all duration-300
            group-hover:scale-110 group-hover:rotate-3
            shadow-lg
          `}>
            <FontAwesomeIcon icon={icon} className="h-8 w-8 text-white" />
          </div>
        )}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-base text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </button>
  );
};

SuggestionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default SuggestionCard; 