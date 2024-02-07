import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '@/database/db';

const router = Router();

router.post('/register', async (req, res) => {
  // Implementar lógica de registro
});

router.post('/login', async (req, res) => {
  // Implementar lógica de login
});

export default router;
