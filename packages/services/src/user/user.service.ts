import { prisma } from "@abhimanyu/database/client"

class UserService {
  public async getUser({ userId }: { userId: string }) {
    return prisma.user.findFirst({
      where: { id: userId },
    })
  }
}

export const userService = new UserService()
