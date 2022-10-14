import prisma from '@/lib/prisma';
import useHelpers from '../../hooks/helper';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Method Not Allowed',
    });
    return;
  }

  const { validatePassword, createExpiration } = useHelpers();

  const { email, password } = req.body;

  try {
    // console.log(checkExpire());
    // const passwords = await prisma.users.findUnique({
    //   where: {
    //     email: email,
    //   },
    //   include: {
    //     passwords: true,
    //   },
    // });
    // await prisma.password.deleteMany();
    // await prisma.users.deleteMany();
    const passwordValidation = validatePassword(password);
    if (typeof passwordValidation === 'boolean') {
      const expiration = createExpiration();
      const entries = await prisma.users.create({
        data: {
          email: email,
          passwords: {
            create: {
              password: password,
              expiresOn: expiration.toISOString(),
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
    // return res.status(200).json({ message: passwords, success: true });
  } catch (error) {
    console.error('Request error', error);
    res
      .status(500)
      .json({ error: 'This email is already in use', success: false });
  }
}
