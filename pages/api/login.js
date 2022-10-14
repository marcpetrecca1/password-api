import prisma from '@/lib/prisma';
import useHelpers from '../../hooks/helper';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Method Not Allowed',
    });
    return;
  }

  const { isExpired } = useHelpers();

  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
      select: {
        passwords: {
          where: {
            activePassword: true,
          },
        },
      },
    });

    if (user.passwords.length === 0) {
      return res.status(500).json({
        error: 'An account connected to this email is not present',
        success: false,
      });
    }

    const activePassword = user.passwords[0].password;
    const expiration = user.passwords[0].expiresOn;

    if (password === activePassword) {
      if (isExpired(expiration)) {
        return res.status(400).json({
          error: 'It is passed the 90 day mark, please renew your password',
          success: false,
        });
      }
      return res
        .status(200)
        .json({ message: 'Login successful', success: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error, success: false });
  }
}
