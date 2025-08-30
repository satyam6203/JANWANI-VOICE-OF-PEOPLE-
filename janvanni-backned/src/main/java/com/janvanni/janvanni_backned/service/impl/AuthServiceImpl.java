package com.janvanni.janvanni_backned.service.impl;

import com.janvanni.janvanni_backned.Request.LoginRequest;
import com.janvanni.janvanni_backned.Response.AuthResponse;
import com.janvanni.janvanni_backned.Response.SignUpRequest;
import com.janvanni.janvanni_backned.Utils.OtpUtils;
import com.janvanni.janvanni_backned.config.JwtProvider;
import com.janvanni.janvanni_backned.constants.USER_ROLE;
import com.janvanni.janvanni_backned.domain.VerificationCode;
import com.janvanni.janvanni_backned.entity.Admin;
import com.janvanni.janvanni_backned.entity.User;
import com.janvanni.janvanni_backned.repo.AdminRepo;
import com.janvanni.janvanni_backned.repo.UserRepo;
import com.janvanni.janvanni_backned.repo.VerificationRepo;
import com.janvanni.janvanni_backned.service.AuthService;
import com.janvanni.janvanni_backned.service.EmailService;
import com.janvanni.janvanni_backned.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepo userRepo;
    private final VerificationRepo verificationRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final EmailService emailService;
    private final UserService userService;
    private final AdminRepo adminRepo;
//    private final AuthService authService;

    @Override
    public String createUser(SignUpRequest req) throws Exception {

        if (!req.getPassword().equals(req.getConfirmPassword())) {
            throw new RuntimeException("Password and Confirm Password do not match!");
        }

        VerificationCode verificationCode = verificationRepo.findByEmail(req.getEmail());
        if (verificationCode == null || !verificationCode.getOtp().equals(req.getOtp())) {
            throw new Exception("Invalid OTP!");
        }

        User user = userRepo.findByEmail(req.getEmail());
        if (user == null) {
            User createUser = new User();
            createUser.setEmail(req.getEmail());
            createUser.setFullName(req.getFullName());
            createUser.setMobile(req.getMobileNumber());
            createUser.setRole(USER_ROLE.ROLE_USER);

            createUser.setPassword(passwordEncoder.encode(req.getPassword()));

            user = userRepo.save(createUser);
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_USER.toString()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(req.getEmail(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }


    @Override
    public void sendLoginOtp(String email) throws Exception {
        String SIGNING_PREFIX = "signing_";
        if(email.startsWith(SIGNING_PREFIX)){

            email = email.substring(SIGNING_PREFIX.length());

            User user = userRepo.findByEmail(email);
            if(user == null){
                throw new Exception("User Not exist with the provided email..");
            }
        }

        VerificationCode isExist=verificationRepo.findByEmail(email);
        if(isExist != null){
            verificationRepo.delete(isExist);
        }

        String otp= OtpUtils.generateOtp();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(email);
        verificationRepo.save(verificationCode);

        String subject = "Janvanni - Your One-Time Password (OTP) for Login/Signup";

        String text = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<meta charset='UTF-8'>" +
                "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                "<title>Janvanni OTP</title>" +
                "</head>" +
                "<body style='margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f9f9f9;'>" +

                "<div style='max-width:600px; margin:15px auto; background-color:#ffffff; padding:20px; " +
                "border-radius:10px; box-shadow:0 3px 10px rgba(0,0,0,0.08);'>" +

                // Title Header
                "<h2 style='color:#1A73E8; text-align:center; font-size:22px; margin:5px 0;'>Janvanni</h2>" +
                "<p style='text-align:center; color:#666; font-size:13px; margin:0 0 15px;'>Your Voice, Our Action!</p>" +

                // Greeting
                "<h3 style='color:#2C3E50; font-size:18px; margin:5px 0;'>Dear User,</h3>" +
                "<p style='color:#333; font-size:14px; line-height:1.5; margin:8px 0;'>Welcome to <b>Janvanni</b>!<br>" +
                "Your One-Time Password (OTP) for login/signup is:</p>" +

                // OTP Highlight Box
                "<div style='background-color:#F3F8FF; border:2px dashed #1A73E8; padding:12px; " +
                "margin:12px auto; width:fit-content; border-radius:8px;'>" +
                "<h1 style='color:#1A73E8; font-size:36px; letter-spacing:6px; margin:0; text-align:center;'>" + otp + "</h1>" +
                "</div>" +

                // Warning Message
                "<p style='color:#D32F2F; font-weight:bold; font-size:13px; text-align:center; margin:8px 0;'>⚠️ Do NOT share this OTP with anyone.</p>" +

                // Validity Info
                "<p style='color:#333; font-size:13px; text-align:center; margin:5px 0;'>This OTP is valid for the next <b>5 minutes</b>.</p>" +

                // Footer
                "<p style='color:#888; font-size:12px; text-align:center; margin:10px 0 5px;'>If you didn't request this, please ignore this email.</p>" +
                "<hr style='margin:10px 0; border:0; border-top:1px solid #eee;'>" +
                "<p style='text-align:center; font-size:13px; color:#2C3E50; margin:5px 0;'>Best Regards,<br><b>Team Janvanni</b></p>" +

                "</div>" +
                "</body>" +
                "</html>";

        emailService.sendVerificationOtpEmail(email,otp,subject,text);
    }

    @Override
    public AuthResponse signing(LoginRequest request) {

        String userName = request.getEmail();
        String otp = request.getOtp();
        Authentication authentication = authenticate(userName,otp);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Login Success..");
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String roleName = authorities.isEmpty()?null:authorities.iterator().next().getAuthority();
        authResponse.setRole(USER_ROLE.valueOf(roleName));

        return authResponse;
    }

    private Authentication authenticate(String userName, String otp) {

        UserDetails userDetails=userService.loadUserByUsername(userName);
        if(userDetails == null){
            throw new BadCredentialsException("Invalid UserName or Password");
        }

        VerificationCode verificationCode=verificationRepo.findByEmail(userName);
        if(verificationCode == null || !verificationCode.getOtp().equals(otp)){
            throw new BadCredentialsException("Wrong Otp..");
        }

        return new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
    }
}
