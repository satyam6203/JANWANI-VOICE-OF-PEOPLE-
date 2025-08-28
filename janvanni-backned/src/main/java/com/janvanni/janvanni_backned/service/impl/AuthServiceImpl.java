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

        VerificationCode verificationCode = verificationRepo.findByEmail(req.getEmail());

        if(verificationCode == null || !verificationCode.getOtp().equals(req.getOtp())){
            throw  new Exception("Wrong otp..");
        }

        User user = userRepo.findByEmail(req.getEmail());
        if(user == null){
            User createUser = new User();
            createUser.setEmail(req.getEmail());
            createUser.setFullName(req.getFullName());
            createUser.setMobile(req.getMobileNumber());
            createUser.setRole(USER_ROLE.ROLE_USER);
            createUser.setPassword(passwordEncoder.encode(req.getOtp()));
            user = userRepo.save(createUser);
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_USER.toString()));
        Authentication authentication = new UsernamePasswordAuthenticationToken(req.getEmail(),null,authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }

    @Override
    public void sendLoginOtp(String email,USER_ROLE role) throws Exception {
        String SIGNING_PREFIX = "signing_";
        if(email.startsWith(SIGNING_PREFIX)){

            email = email.substring(SIGNING_PREFIX.length());

            if(role.equals(USER_ROLE.ROLE_ADMIN)){
                Admin admin= adminRepo.findByEmail(email);
                if(admin==null){
                    throw new Exception("Admin not found");
                }
            }
            else{
                User user = userRepo.findByEmail(email);
                if(user == null){
                    throw new Exception("User Not exist with the provided email..");
                }

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

        String subject = "Janwani - Your One-Time Password (OTP) for Login/Signup";
        String text = "Dear User,\n\n"
                + "Welcome to Janwani - Your Voice, Our Action!\n\n"
                + "Your One-Time Password (OTP) for login/signup is: " + otp + "\n\n"
                + "⚠️ Please do not share this OTP with anyone for your security.\n"
                + "This OTP is valid for the next 5 minutes.\n\n"
                + "If you didn't request this, please ignore this email.\n\n"
                + "Best Regards,\n"
                + "Team Janwani";

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
