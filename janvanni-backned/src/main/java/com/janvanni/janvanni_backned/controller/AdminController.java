package com.janvanni.janvanni_backned.controller;

import com.janvanni.janvanni_backned.Request.ChangePasswordRequest;
import com.janvanni.janvanni_backned.Request.LoginOtpRequest;
import com.janvanni.janvanni_backned.Response.ApiResponse;
import com.janvanni.janvanni_backned.Response.SignUpRequest;
import com.janvanni.janvanni_backned.entity.Admin;
import com.janvanni.janvanni_backned.repo.VerificationRepo;
import com.janvanni.janvanni_backned.service.AdminService;
import com.janvanni.janvanni_backned.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/delete/account")
    public ResponseEntity<Void> deleteAdminAccount(@PathVariable Long id){
        adminService.deleteAccount(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/admin/{id}/change-password")
    public ResponseEntity<?> changePassword(
            @PathVariable Long id,
            @RequestBody ChangePasswordRequest request) {
        try {
            Admin updatedAdmin = adminService.updateAdminPassword(id, request);
            return ResponseEntity.ok("Password updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
