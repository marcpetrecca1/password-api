import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Method Not Allowed',
    });
    return;
  }
  const body = req.body;

  try {
    // const entries = await prisma.password.findMany();
    // await prisma.password.deleteMany();
    // await prisma.users.deleteMany();
    const passwordValidation = validatePassword(body.password);
    if (typeof passwordValidation === 'boolean') {
      const entries = await prisma.users.create({
        data: {
          email: body.email,
          passwords: {
            create: {
              password: body.password,
            },
          },
        },
      });
      return res.status(200).json({ message: 'Created', success: true });
    } else {
      if (typeof passwordValidation !== 'boolean') {
        return res.status(500).json({
          error: 'Error creating question',
          success: false,
          data: passwordValidation,
        });
      }
    }
  } catch (error) {
    console.error('Request error', error);
    res
      .status(500)
      .json({ error: 'This email is already in use', success: false });
  }
}

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
