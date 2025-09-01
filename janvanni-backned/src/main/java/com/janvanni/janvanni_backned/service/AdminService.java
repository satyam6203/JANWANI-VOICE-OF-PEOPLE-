package com.janvanni.janvanni_backned.service;

import com.janvanni.janvanni_backned.Request.ChangePasswordRequest;
import com.janvanni.janvanni_backned.Response.SignUpRequest;
import com.janvanni.janvanni_backned.entity.Admin;

public interface AdminService {

    String createAdmin(SignUpRequest request) throws Exception;
//    String signing(LoginRequest request) throws Exception;
    void sendAdminLoginOtp(String email) throws Exception;

    void deleteAccount(Long id);
    Admin getAdminProfile(String jwt);
    Admin updateAdminPassword(Long id, ChangePasswordRequest request) throws Exception;
    Admin getAdminById(Long id) throws Exception;
}
