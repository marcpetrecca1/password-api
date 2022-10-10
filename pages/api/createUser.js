export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Method Not Allowed',
    });
    return;
  }
  res.status(200).json({
    message: 'You successfully created an account',
    success: true,
  });

  return;
}
