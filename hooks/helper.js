import React from 'react';

export default function useHelpers() {
  function validatePassword(password) {
    const errorStorage = {};
    const capitalLetters = /[A-Z]/g;
    const specialCharacters = /[\W|_]/g;
    const numbers = /[\d]/g;
    const lowercaseLetters = /[a-z]/g;

    if (password.length < 8) {
      errorStorage.length = 'Password must have atleast 8 characters';
    }
    if (password.match(capitalLetters) === null) {
      errorStorage.capitalLetters = 'You must have atleast 1 capital letter';
    }
    if (password.match(specialCharacters) === null) {
      errorStorage.specialCharacters =
        'You must have atleast one special character';
    }
    if (password.match(numbers) === null) {
      errorStorage.numbers = 'You must have atleast one number';
    }
    if (password.match(lowercaseLetters) === null) {
      errorStorage.lowerCase = 'You must have atleast one lowercase number';
    }

    if (Object.keys(errorStorage).length === 0) {
      return true;
    } else {
      return errorStorage;
    }
  }

  function createExpiration() {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 90);
    return futureDate;
  }

  function isExpired(expiration) {
    let currentDate = new Date().getTime();
    let expireDate = new Date(expiration).getTime();
    if (currentDate > expireDate) {
      return true;
    }
    return false;
  }

  return {
    validatePassword,
    createExpiration,
    isExpired,
  };
}
