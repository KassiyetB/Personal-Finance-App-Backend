import jwt from "jsonwebtoken";

export function createAccessToken(userId: string) {
    return jwt.sign(
        {
            userId,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "15m",
        }
    );
}