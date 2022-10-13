import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { useHelpers } from '../../hooks/helper';

export default async function handler(req, res) {
  const { validatePassword } = useHelpers();

  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Method Not Allowed',
    });
    return;
  }

  const body = req.body;

  try {
    // const entries = await prisma.users.findMany();
    // await prisma.password.deleteMany();
    // await prisma.users.deleteMany();

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 90);

    const passwordValidation = validatePassword(body.password);
    if (typeof passwordValidation === 'boolean') {
      const entries = await prisma.users.create({
        data: {
          email: body.email,
          passwords: {
            create: {
              password: body.password,
              expiresOn: futureDate.toISOString(),
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
    res.status(200).json({ message: 'Created', success: true });
  } catch (error) {
    console.error('Request error', error);
    res
      .status(500)
      .json({ error: 'This email is already in use', success: false });
  }
}
