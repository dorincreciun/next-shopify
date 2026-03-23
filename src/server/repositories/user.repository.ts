import prisma from "@shared/lib/prisma"
import { User } from "@shared/lib/generated/prisma/client"

export const getUserByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { email },
    })
}
