import React from 'react';

const ErrorMessages = ({ errors }: { errors: string[] | string | undefined }) => {
  let errorMessages: string[] = [];

  if (Array.isArray(errors)) {
    errorMessages = errors;
  } else if (typeof errors === 'string') {
    errorMessages = [errors];
  }

  return (
    <ul>
      {errorMessages.map((error, index) => (
        <li key={index} className="text-red-500">{error}</li>
      ))}
    </ul>
  );
};

export default ErrorMessages;
