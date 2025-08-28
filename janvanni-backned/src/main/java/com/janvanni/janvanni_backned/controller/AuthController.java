package com.janvanni.janvanni_backned.controller;

import com.janvanni.janvanni_backned.Request.LoginOtpRequest;
import com.janvanni.janvanni_backned.Request.LoginRequest;
import com.janvanni.janvanni_backned.Response.ApiResponse;
import com.janvanni.janvanni_backned.Response.AuthResponse;
import com.janvanni.janvanni_backned.Response.SignUpRequest;
import com.janvanni.janvanni_backned.constants.USER_ROLE;
import com.janvanni.janvanni_backned.repo.UserRepo;
import com.janvanni.janvanni_backned.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/janwani")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepo userRepo;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignUpRequest req) throws Exception {
        String jwt = authService.createUser(req);
        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setMessage("register successfully");
        res.setRole(USER_ROLE.ROLE_USER);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/sent/otp")
    public ResponseEntity<ApiResponse> SendOtpHandler(@RequestBody LoginOtpRequest req) throws Exception {
        authService.sendLoginOtp(req.getEmail(),req.getRole());
        ApiResponse res = new ApiResponse();
        res.setMessage("otp sent successfully");
        return ResponseEntity.ok(res);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> LoginHandler(@RequestBody LoginRequest req) throws Exception {
        AuthResponse authResponse = authService.signing(req);
        AuthResponse res = new AuthResponse();
        res.setMessage("Login Successfully..");
        return ResponseEntity.ok(res);
    }
}
