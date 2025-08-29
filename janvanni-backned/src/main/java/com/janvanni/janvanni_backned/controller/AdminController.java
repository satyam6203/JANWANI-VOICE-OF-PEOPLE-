package com.janvanni.janvanni_backned.controller;

import com.janvanni.janvanni_backned.Request.LoginOtpRequest;
import com.janvanni.janvanni_backned.Response.ApiResponse;
import com.janvanni.janvanni_backned.Response.SignUpRequest;
import com.janvanni.janvanni_backned.Utils.OtpUtils;
import com.janvanni.janvanni_backned.domain.VerificationCode;
import com.janvanni.janvanni_backned.entity.Admin;
import com.janvanni.janvanni_backned.repo.VerificationRepo;
import com.janvanni.janvanni_backned.service.AdminService;
import com.janvanni.janvanni_backned.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/janwani/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final VerificationRepo verificationRepo;
    private final EmailService emailService;

    @PostMapping("/create")
    public ResponseEntity<String> createAdmin(@RequestBody SignUpRequest request) throws Exception {
        String jwt = adminService.createAdmin(request);
        return new ResponseEntity<>(jwt, HttpStatus.CREATED);
    }

    @PostMapping("/sent/otp")
    public ResponseEntity<ApiResponse> SendOtpHandler(@RequestBody LoginOtpRequest req) throws Exception {
        adminService.sendAdminLoginOtp(req.getEmail());
        ApiResponse res = new ApiResponse();
        res.setMessage("otp sent successfully");
        return ResponseEntity.ok(res);
    }
}
