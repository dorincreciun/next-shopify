"use server"

import crypto from "crypto";
import bcrypt from 'bcrypt'
import {cookies} from "next/headers";

interface SessionMetadata {
    token: string
    expiresAt: Date
}

export const generateSessionMetadata = async (): Promise<SessionMetadata> => {
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)

    return {
        token,
        expiresAt
    }
}

interface SessionProps {
    token: string
    name?: string
    expiresAt: Date
}

export const setSession = async ({token, name = 'session-token', expiresAt}: SessionProps) => {
    const cookiesStore = await cookies()
    cookiesStore.set(name, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: expiresAt,
        path: '/',
    })
}

export const deleteSession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('session-token');
}

export const hashPassword = async (password: string, salt: number = 12): Promise<string> => {
    return bcrypt.hash(password, salt)
}

export const verifyPassword = async (password: string, hashedPasswordDb: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPasswordDb)
}