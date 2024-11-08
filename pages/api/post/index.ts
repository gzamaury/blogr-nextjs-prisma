import { authOptions } from '../auth/[...nextauth]';
// import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;

  // insted of getSession, we need use getServerSession - https://next-auth.js.org/configuration/nextjs#getserversession
  const session = await getServerSession(req, res, authOptions);
  // console.log(title);
  // console.log(content);
  // console.log(session);

  if (!session || !session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  
  res.json(result);
}