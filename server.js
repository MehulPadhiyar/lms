import dotenv from 'dotenv';
import { app } from './app.js';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

dotenv.config({ path: './.env' });

const port = process.env.PORT;
export const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
      password_reset_expires: true,
      password_reset_token: true,
      active: true,
    },
  },
}).$extends({
  model: {
    user: {
      async createPasswordResetToken(user) {
        const token = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const tokenExpires = (Date.now() + 10 * 60 * 1000).toString();
        await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            password_reset_token: hashedToken,
            password_reset_expires: tokenExpires,
          },
        });
        return token;
      },
    },
  },
});

app.listen(port, () => {
  console.log(`App runnig on ${port}  port...`);
});
