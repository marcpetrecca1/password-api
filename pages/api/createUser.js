import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  // if (req.method !== 'POST') {
  //   res.status(405).json({
  //     message: 'Method Not Allowed',
  //   });
  //   return;
  // }
  const body = req.body;

  try {
    // const newEntry = await prisma.users.create({
    //   data: body,
    // });
    // return res.json(newEntry).status(200);
    const entries =
      await prisma.$queryRaw`DELETE FROM users WHERE email='michael@gmail.com'`;
    return res.json(entries).status(200);
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Error creating question', success: false });
  }
  // const { email, password } = body;
  // const emailValidation = validateEmail(email);
  // const passwordValidation = validatePassword(password);

  // console.log('emailValidation', emailValidation);
  // console.log('passwordValidation', passwordValidation);

  // if (emailValidation) {
  //   return res.status(400).json({
  //     message: 'There is already an account associated with this email',
  //   });
  // }
  // if (!passwordValidation) {
  //   return res.status(400).json({
  //     message: passwordValidation,
  //   });
  // }
  // res.status(200).json({
  //   message: 'You successfully created an account',
  //   success: true,
  //   body: body,
  // });
}

async function validateEmail(email) {
  try {
    const response = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (response === null) {
      return true;
    }
    console.log('this is the response', response);
  } catch (error) {
    console.log('this is the error', error);
    return error;
  }
}

function validatePassword(password) {
  const errorStorage = {};
  const capitalLetters = /^A-Z/;
  const specialCharacters = /^\W|_/g;
  const numbers = /^\d/;
  const lowercaseLetters = /^a-z/;
  if (password.length < 8) {
    errorStorage.length = 'Password must have atleast 8 characters';
  }
  if (capitalLetters.test(password)) {
    errorStorage.capitalLetters = 'You must have atleast 1 capital letter';
  }
  if (specialCharacters.test(password)) {
    errorStorage.specialCharacters =
      'You must have atleast one special character';
  }
  if (numbers.test(password)) {
    errorStorage.numbers = 'You must have atleast one number';
  }
  if (lowercaseLetters.test(password)) {
    errorStorage.lowerCase = 'You must have atleast one lowercase number';
  }

  if (Object.keys(errorStorage).length === 0) {
    return true;
  } else {
    return errorStorage;
  }
}
