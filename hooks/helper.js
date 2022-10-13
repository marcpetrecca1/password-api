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

  return {
    validatePassword,
  };
}
