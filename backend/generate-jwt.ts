import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Role } from '@prisma/client';

dotenv.config({ path: './.env' });

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  console.error('JWT_SECRET is not defined in .env file');
  process.exit(1);
}

const generateJwt = (userId: number, role: Role) => {
  const token = jwt.sign({ userId, role }, jwtSecret, { expiresIn: '1h' });
  return token;
};

// Example usage:
// To generate a token for an ADMIN user with userId 1:
// console.log('ADMIN Token:', generateJwt(1, Role.ADMIN));

// To generate a token for a TEACHER user with userId 2:
// console.log('TEACHER Token:', generateJwt(2, Role.TEACHER));

// To generate a token for a STUDENT user with userId 3:
// console.log('STUDENT Token:', generateJwt(3, Role.STUDENT));

// You can modify these examples or call generateJwt with your desired userId and role

// Example for command line arguments:
const args = process.argv.slice(2);
const userId = parseInt(args[0]);
const role = args[1] as Role;

if (isNaN(userId) || !Object.values(Role).includes(role)) {
  console.error('Usage: ts-node generate-jwt.ts <userId> <role>');
  console.error('Example: ts-node generate-jwt.ts 1 ADMIN');
  process.exit(1);
}

console.log(`Generated JWT for User ID: ${userId}, Role: ${role}`);
console.log(generateJwt(userId, role));
