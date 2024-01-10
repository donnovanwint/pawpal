// imports
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/utils/mongodb";
import User from "@/utils/userModel";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account && account.provider === 'google') {
                await dbConnect();

                // Ensure the email exists to prevent TypeScript errors
                if (user.email) {
                    const existingUser = await User.findOne({ email: user.email });
                    if (!existingUser && profile) {
                        await User.create({
                            email: user.email,
                            name: user.name ?? '', // Fallback to empty string if name is undefined
                            image: user.image ?? '',
                            googleId: profile.sub ?? '',
                        });
                    }
                }
            }
            return true; // Sign-in successful
        },
        async session({ session, user }) {
            // You can add custom logic here if needed for the session
            return session;
        },
    },
});

export { handler as GET, handler as POST };
