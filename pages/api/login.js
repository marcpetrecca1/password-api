import prisma from '@/lib/prisma';
import useHelpers from '../../hooks/helper';

export default async function handler(req, res) {
  const { checkExpire } = useHelpers();
  // console.log(checkExpire());

  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      console.log(user.coinflips);

      user.coinflips.push(true, true, false);

      const updatedUser = await prisma.user.update({
        where: {
          email: 'eloise@prisma.io',
        },
        data: {
          coinflips: user.coinflips,
        },
      });

      console.log(updatedUser.coinflips);
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: error, success: false });
  }

  // if (req.method !== 'POST') {
  //   res.status(405).json({
  //     message: 'Method Not Allowed',
  //   });
  //   return;
  // }

  // res.status(200).json({
  //   message: 'Your login was successful',
  //   success: true,
  // });
}
