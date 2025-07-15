import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faUser, faSpinner, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MessageBubble = ({
  message,
  isAI = false,
  timestamp,
  status = 'sent',
  className = '',
  imageUrl = null,
  hasImage = false,
}) => {
  const bubbleStyles = isAI
    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm'
    : 'bg-white border border-gray-200 shadow-sm';

  const renderContent = () => {
    return (
      <div className="space-y-3">
        {/* 文本内容 */}
        {typeof message === 'string' ? (
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg text-sm"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={`${className} bg-gray-100 rounded px-1 py-0.5 text-sm`} {...props}>
                    {children}
                  </code>
                );
              },
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2 last:mb-0">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 last:mb-0">{children}</ol>,
              li: ({ children }) => <li className="mb-1 last:mb-0">{children}</li>,
            }}
          >
            {message}
          </ReactMarkdown>
        ) : (
          message
        )}

        {/* 图片内容 */}
        {hasImage && imageUrl && (
          <div className="mt-3">
            <div className="relative group">
              <img
                src={imageUrl}
                alt="AI生成的图像"
                className="max-w-full h-auto rounded-lg shadow-lg transition-transform duration-200 group-hover:scale-105"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  console.error('Image failed to load:', imageUrl);
                }}
                onLoad={() => {
                  console.log('Image loaded successfully');
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg"></div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              🎨 AI生成的游戏素材图像
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`
        flex items-start space-x-4 p-4 rounded-2xl
        ${className}
        ${isAI ? 'bg-blue-50/30' : ''}
        animate-fadeIn
      `}
    >
      <div
        className={`
          flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
          ${
            isAI
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg'
              : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg'
          }
          transform transition-transform duration-200 hover:scale-110
        `}
      >
        <FontAwesomeIcon icon={isAI ? faRobot : faUser} className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-bold text-gray-900">
              {isAI ? 'AI Assistant' : 'You'}
            </p>
            {status === 'sending' && (
              <FontAwesomeIcon icon={faSpinner} className="h-3 w-3 text-gray-400 animate-spin" />
            )}
            {status === 'error' && (
              <FontAwesomeIcon icon={faExclamationCircle} className="h-3 w-3 text-red-500" />
            )}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {new Date(timestamp).toLocaleTimeString()}
          </span>
        </div>
        <div
          className={`
            ${bubbleStyles}
            rounded-2xl p-4
            text-sm text-gray-800
            transition-all duration-200
            hover:shadow-md
          `}
        >
          {renderContent()}
        </div>
        {status === 'sending' && (
          <p className="mt-1 text-xs text-gray-500 animate-pulse">正在发送...</p>
        )}
        {status === 'error' && (
          <p className="mt-1 text-xs text-red-500 font-medium">发送失败，请重试</p>
        )}
      </div>
    </div>
  );
};

MessageBubble.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isAI: PropTypes.bool,
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  status: PropTypes.oneOf(['sent', 'sending', 'error']),
  className: PropTypes.string,
  imageUrl: PropTypes.string,
  hasImage: PropTypes.bool,
};

export default MessageBubble; 