import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: true,
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
})

interface SendEmailParams {
    to: string
    subject: string
    html: string
}

export const sendEmail = async (params: SendEmailParams) => {
    try {
        const info = await transporter.sendMail({
            from: `"Nume Aplicatie" <${process.env.EMAIL_SERVER_USER}>`,
            ...params,
        })
        return { success: true, messageId: info.messageId }
    } catch (error) {
        console.error("Eroare Nodemailer:", error)
        return { success: false, error }
    }
}
