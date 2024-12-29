// src/services/mail.service.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const mailService = {
  async sendPasswordResetMail(email: string, resetUrl: string) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "パスワードリセット",
        text: `パスワードをリセットするには以下のリンクをクリックしてください：\n\n${resetUrl}`,
        html: `
          <p>パスワードをリセットするには以下のリンクをクリックしてください：</p>
          <p><a href="${resetUrl}">パスワードをリセット</a></p>
        `,
      });
    } catch (error) {
      console.error("SendMailError:", error);
      throw new Error("メール送信に失敗しました");
    }
  },
};
