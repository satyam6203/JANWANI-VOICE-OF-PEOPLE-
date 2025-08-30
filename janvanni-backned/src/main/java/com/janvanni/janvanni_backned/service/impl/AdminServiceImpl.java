package com.janvanni.janvanni_backned.service.impl;

import com.janvanni.janvanni_backned.Response.SignUpRequest;
import com.janvanni.janvanni_backned.Utils.OtpUtils;
import com.janvanni.janvanni_backned.config.JwtProvider;
import com.janvanni.janvanni_backned.constants.USER_ROLE;
import com.janvanni.janvanni_backned.domain.VerificationCode;
import com.janvanni.janvanni_backned.entity.Admin;
import com.janvanni.janvanni_backned.repo.AdminRepo;
import com.janvanni.janvanni_backned.repo.VerificationRepo;
import com.janvanni.janvanni_backned.service.AdminService;
import com.janvanni.janvanni_backned.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepo adminRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final VerificationRepo verificationRepo;
    private final EmailService emailService;

    @Override
    public String createAdmin(SignUpRequest request) throws Exception {

        VerificationCode verificationCode = verificationRepo.findByEmail(request.getEmail());

        if (verificationCode == null || !verificationCode.getOtp().equals(request.getOtp())) {
            throw new Exception("Wrong OTP!");
        }

        Admin admin = adminRepo.findByEmail(request.getEmail());
        if (admin == null) {
            Admin newAdmin = new Admin();
            newAdmin.setEmail(request.getEmail());
            newAdmin.setFullName(request.getFullName());
            newAdmin.setMobile(request.getMobileNumber());
            newAdmin.setRole(USER_ROLE.ROLE_ADMIN);
            newAdmin.setPassword(passwordEncoder.encode(request.getOtp()));  // Temporary password
            admin = adminRepo.save(newAdmin);
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_ADMIN.toString()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                null,
                authorities
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }

    @Override
    public void sendAdminLoginOtp(String email) throws Exception {

        String SIGNING_PREFIX = "signing_";
        if(email.startsWith(SIGNING_PREFIX)){

            email = email.substring(SIGNING_PREFIX.length());

            Admin admin = adminRepo.findByEmail(email);
            if(admin == null){
                throw new Exception("Admin Not exist with the provided email..");
            }
        }

        VerificationCode existingOtp = verificationRepo.findByEmail(email);
        if (existingOtp != null) {
            verificationRepo.delete(existingOtp);
        }

        String otp = OtpUtils.generateOtp();

        // Save OTP in DB
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(email);
        verificationRepo.save(verificationCode);

        String subject = "Janvanni Admin Portal - Your One-Time Password (OTP)";

        String text = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<meta charset='UTF-8'>" +
                "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                "<title>Janvanni Admin OTP</title>" +
                "</head>" +
                "<body style='margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f9f9f9;'>" +

                "<div style='max-width:600px; margin:15px auto; background-color:#ffffff; padding:20px; " +
                "border-radius:10px; box-shadow:0 3px 10px rgba(0,0,0,0.08);'>" +

                // Title Header
                "<h2 style='color:#1A73E8; text-align:center; font-size:22px; margin:5px 0;'>Janvanni Admin Portal</h2>" +
                "<p style='text-align:center; color:#666; font-size:13px; margin:0 0 15px;'>Secure Access Verification</p>" +

                // Greeting
                "<h3 style='color:#2C3E50; font-size:18px; margin:5px 0;'>Dear Admin,</h3>" +
                "<p style='color:#333; font-size:14px; line-height:1.5; margin:8px 0;'>Welcome to the <b>Janvanni Admin Portal</b>!<br>" +
                "Your One-Time Password (OTP) for login/signup is:</p>" +

                // OTP Highlight Box
                "<div style='background-color:#F3F8FF; border:2px dashed #1A73E8; padding:12px; " +
                "margin:12px auto; width:fit-content; border-radius:8px;'>" +
                "<h1 style='color:#1A73E8; font-size:36px; letter-spacing:6px; margin:0; text-align:center;'>" + otp + "</h1>" +
                "</div>" +

                // Warning Message
                "<p style='color:#D32F2F; font-weight:bold; font-size:13px; text-align:center; margin:8px 0;'>⚠️ Please DO NOT share this OTP with anyone.</p>" +

                // Validity Info
                "<p style='color:#333; font-size:13px; text-align:center; margin:5px 0;'>This OTP is valid for the next <b>5 minutes</b>.</p>" +

                // Footer
                "<p style='color:#888; font-size:12px; text-align:center; margin:10px 0 5px;'>If you did not request this, please ignore this email.</p>" +
                "<hr style='margin:10px 0; border:0; border-top:1px solid #eee;'>" +
                "<p style='text-align:center; font-size:13px; color:#2C3E50; margin:5px 0;'>Best Regards,<br><b>Team Janvanni</b></p>" +

                "</div>" +
                "</body>" +
                "</html>";
        emailService.sendVerificationOtpEmail(email, otp, subject, text);
    }

    @Override
    public void deleteAccount(Long id) {
        adminRepo.deleteById(id);
    }

    @Override
    public Admin getAdminProfile(String jwt) {
        String email = jwtProvider.getEmailFromToken(jwt);
        return this.getAdminProfile(email);
    }
}


