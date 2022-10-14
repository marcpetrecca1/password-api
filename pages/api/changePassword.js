import prisma from '@/lib/prisma';
import useHelpers from '../../hooks/helper';

export default async function handler(req, res) {
  const { validatePassword, createExpiration } = useHelpers();

  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Method Not Allowed',
    });
    return;
  }

  const { email, password } = req.body;

  try {
    // check if account is present
    const passwords = await prisma.users.findUnique({
      where: {
        email: email,
      },
      include: {
        passwords: true,
      },
    });

    if (!passwords) {
      return res.status(400).json({
        error: 'An account connected to this email is not present',
        success: false,
      });
    }

    // check if password is alphanumerically valid

    const isValid = validatePassword(password);

    if (typeof isValid !== 'boolean') {
      return res.status(400).json({
        error: 'Password is incorrect',
        success: false,
        body: isValid,
      });
    }

    // check to see if new password is same as any old
    const present = await prisma.password.findMany({
      where: {
        AND: [
          {
            usersEmail: {
              equals: email,
            },
          },
          {
            password: password,
          },
        ],
      },
    });

    if (present.length > 0) {
      return res.status(400).json({
        error: 'Cannot use any previous passwords',
        success: false,
      });
    }
    const passwordList = passwords.passwords;
    // find the active password and oldest

    let activePassword;
    let oldest = new Date(passwordList[0].expiresOn).getTime();

    for (let i = 0; i < passwordList.length; i++) {
      let currentPassword = passwordList[i];
      let currentExpiration = new Date(currentPassword.expiresOn).getTime();
      if (currentPassword.activePassword === true) {
        activePassword = currentPassword;
      }
      if (currentExpiration < oldest) {
        oldest = currentPassword;
      }
    }

    // change current active password to false
    const updateCurrent = await prisma.password.update({
      where: {
        id: activePassword.id,
      },
      data: {
        activePassword: false,
      },
    });

    // if there are 3 previous passwords, remove the oldest

    if (passwordList.length === 4) {
      const removeOldest = await prisma.password.delete({
        where: {
          id: oldest.id,
        },
      });
    }

    // if not add password

    const expiration = createExpiration();

    const addedPassword = await prisma.users.update({
      where: {
        email: email,
      },
      data: {
        passwords: {
          create: { password: password, expiresOn: expiration },
        },
      },
    });

    return res.status(200).json({
      message: 'Password successfully changed',
      success: true,
      body: addedPassword,
    });
  } catch (error) {
    return res.status(500).json({ error: error, success: false });
  }
}
