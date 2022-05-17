export default async function handler(req, res) {
  res.status(200).json({
    message: "Your first API call",
    success: true,
  });

  return;
}
