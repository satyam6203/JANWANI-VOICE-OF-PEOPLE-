package com.janvanni.janvanni_backned.service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    public void sendVerificationOtpEmail(
            String userEmail,
            String otp,
            String subject,
            String text
    ) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, "utf-8");
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(text, true);
            mimeMessageHelper.setTo(userEmail);
            javaMailSender.send(message);
        } catch (Exception e) {
            throw new MailSendException("Failed to send email");
        }
    }
    
    public void sendAdminPasswordChangeEmail(String adminEmail, String adminName) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            String subject = "Janvanni Admin Password Changed";
            String text = "<div style='font-family: Arial, sans-serif; padding: 15px;'>" +
                    "<h2 style='color: #2E86C1;'>Hello " + adminName + ",</h2>" +
                    "<p>Your <b>Admin</b> password has been successfully changed.</p>" +
                    "<p>If this wasn’t you, please contact the support team immediately.</p>" +
                    "<br/>" +
                    "<p style='color: #555;'>Regards,<br/><b>Janvanni Security Team</b></p>" +
                    "</div>";

            helper.setSubject(subject);
            helper.setText(text, true);
            helper.setTo(adminEmail);

            javaMailSender.send(message);
        } catch (Exception e) {
            throw new MailSendException("Failed to send admin password change email");
        }
    }

    public void sendUserPasswordChangeEmail(String userEmail, String userName) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            String subject = "Janvanni User Password Changed";
            String text = "<div style='font-family: Arial, sans-serif; padding: 15px;'>" +
                    "<h2 style='color: #28A745;'>Hello " + userName + ",</h2>" +
                    "<p>Your <b>User</b> account password has been successfully changed.</p>" +
                    "<p>If this wasn’t you, please reset your password immediately.</p>" +
                    "<br/>" +
                    "<p style='color: #555;'>Thanks,<br/><b>Janvanni Support Team</b></p>" +
                    "</div>";

            helper.setSubject(subject);
            helper.setText(text, true);
            helper.setTo(userEmail);

            javaMailSender.send(message);
        } catch (Exception e) {
            throw new MailSendException("Failed to send user password change email");
        }
    }
}
