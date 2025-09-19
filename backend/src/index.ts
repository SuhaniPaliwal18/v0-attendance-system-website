import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  console.error('JWT_SECRET is not defined in .env file');
  process.exit(1);
}

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Extend the Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: { userId: number; role: Role };
    }
  }
}

// Auth middleware
const authenticateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token

  jwt.verify(token, jwtSecret, (err: any, user: any) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user as { userId: number; role: Role };
    next();
  });
};

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Protected route to fetch users (requires authentication)
app.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Protected route to get authenticated user's profile
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user?.userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Exclude password from the response
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Student routes (Protected - ADMIN/TEACHER only)
app.post('/api/students', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN && req.user?.role !== Role.TEACHER) {
    return res.status(403).json({ error: 'Forbidden: Only ADMIN or TEACHER can create students' });
  }
  const { studentId, userId, class: studentClass, dateOfBirth, address, phone } = req.body;

  if (!studentId || !userId || !studentClass) {
    return res.status(400).json({ error: 'Student ID, User ID, and Class are required' });
  }

  try {
    const newStudent = await prisma.student.create({
      data: {
        studentId,
        userId,
        class: studentClass,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        address,
        phone,
      },
    });
    res.status(201).json({ message: 'Student created successfully', student: newStudent });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
});

app.get('/api/students', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN && req.user?.role !== Role.TEACHER) {
    return res.status(403).json({ error: 'Forbidden: Only ADMIN or TEACHER can view all students' });
  }
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.get('/api/students/:id', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN && req.user?.role !== Role.TEACHER && req.user?.userId !== parseInt(req.params.id)) {
    return res.status(403).json({ error: 'Forbidden: You can only view your own student profile' });
  }
  try {
    const student = await prisma.student.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

app.put('/api/students/:id', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN && req.user?.role !== Role.TEACHER) {
    return res.status(403).json({ error: 'Forbidden: Only ADMIN or TEACHER can update students' });
  }
  const { studentId, userId, class: studentClass, dateOfBirth, address, phone } = req.body;

  try {
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(req.params.id) },
      data: {
        studentId,
        userId,
        class: studentClass,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        address,
        phone,
      },
    });
    res.json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

app.delete('/api/students/:id', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Only ADMIN can delete students' });
  }
  try {
    await prisma.student.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

// Teacher routes (Protected - ADMIN only)
app.post('/api/teachers', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Only ADMIN can create teachers' });
  }
  const { teacherId, userId, subject, phone } = req.body;

  if (!teacherId || !userId || !subject) {
    return res.status(400).json({ error: 'Teacher ID, User ID, and Subject are required' });
  }

  try {
    const newTeacher = await prisma.teacher.create({
      data: {
        teacherId,
        userId,
        subject,
        phone,
      },
    });
    res.status(201).json({ message: 'Teacher created successfully', teacher: newTeacher });
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ error: 'Failed to create teacher' });
  }
});

app.get('/api/teachers', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Only ADMIN can view all teachers' });
  }
  try {
    const teachers = await prisma.teacher.findMany();
    res.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
});

app.get('/api/teachers/:id', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN && req.user?.userId !== parseInt(req.params.id)) {
    return res.status(403).json({ error: 'Forbidden: You can only view your own teacher profile' });
  }
  try {
    const teacher = await prisma.teacher.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ error: 'Failed to fetch teacher' });
  }
});

app.put('/api/teachers/:id', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Only ADMIN can update teachers' });
  }
  const { teacherId, userId, subject, phone } = req.body;

  try {
    const updatedTeacher = await prisma.teacher.update({
      where: { id: parseInt(req.params.id) },
      data: {
        teacherId,
        userId,
        subject,
        phone,
      },
    });
    res.json({ message: 'Teacher updated successfully', teacher: updatedTeacher });
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ error: 'Failed to update teacher' });
  }
});

app.delete('/api/teachers/:id', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Only ADMIN can delete teachers' });
  }
  try {
    await prisma.teacher.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ error: 'Failed to delete teacher' });
  }
});

// Attendance routes (Protected - ADMIN/TEACHER only)
app.post('/api/attendance', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN && req.user?.role !== Role.TEACHER) {
    return res.status(403).json({ error: 'Forbidden: Only ADMIN or TEACHER can record attendance' });
  }
  const { studentId, date, status } = req.body;

  if (!studentId || !date || !status) {
    return res.status(400).json({ error: 'Student ID, Date, and Status are required' });
  }

  try {
    const newAttendance = await prisma.attendance.create({
      data: {
        studentId,
        date: new Date(date),
        status,
      },
    });
    res.status(201).json({ message: 'Attendance recorded successfully', attendance: newAttendance });
  } catch (error) {
    console.error('Error recording attendance:', error);
    res.status(500).json({ error: 'Failed to record attendance' });
  }
});

app.get('/api/attendance', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN && req.user?.role !== Role.TEACHER) {
    return res.status(403).json({ error: 'Forbidden: Only ADMIN or TEACHER can view attendance' });
  }
  try {
    const attendanceRecords = await prisma.attendance.findMany();
    res.json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
});

app.get('/api/attendance/:id', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN && req.user?.role !== Role.TEACHER) {
    return res.status(403).json({ error: 'Forbidden: Only ADMIN or TEACHER can view attendance records' });
  }
  try {
    const attendance = await prisma.attendance.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json(attendance);
  } catch (error) {
    console.error('Error fetching attendance record:', error);
    res.status(500).json({ error: 'Failed to fetch attendance record' });
  }
});

app.put('/api/attendance/:id', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN && req.user?.role !== Role.TEACHER) {
    return res.status(403).json({ error: 'Forbidden: Only ADMIN or TEACHER can update attendance records' });
  }
  const { studentId, date, status } = req.body;

  try {
    const updatedAttendance = await prisma.attendance.update({
      where: { id: parseInt(req.params.id) },
      data: {
        studentId,
        date: new Date(date),
        status,
      },
    });
    res.json({ message: 'Attendance record updated successfully', attendance: updatedAttendance });
  } catch (error) {
    console.error('Error updating attendance record:', error);
    res.status(500).json({ error: 'Failed to update attendance record' });
  }
});

app.delete('/api/attendance/:id', authenticateToken, async (req, res) => {
  if (req.user?.role !== Role.ADMIN) {
    return res.status(403).json({ error: 'Forbidden: Only ADMIN can delete attendance records' });
  }
  try {
    await prisma.attendance.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting attendance record:', error);
    res.status(500).json({ error: 'Failed to delete attendance record' });
  }
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || Role.STUDENT, // Default role to STUDENT if not provided
      },
    });
    res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });

    res.json({ message: 'Logged in successfully', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
