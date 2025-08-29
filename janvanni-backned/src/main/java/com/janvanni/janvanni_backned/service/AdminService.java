package com.janvanni.janvanni_backned.service;

import com.janvanni.janvanni_backned.Request.LoginRequest;
import com.janvanni.janvanni_backned.Response.SignUpRequest;
import com.janvanni.janvanni_backned.constants.USER_ROLE;
import com.janvanni.janvanni_backned.entity.Admin;

public interface AdminService {

    String createAdmin(SignUpRequest request) throws Exception;
//    String signing(LoginRequest request) throws Exception;
    void sendAdminLoginOtp(String email) throws Exception;
}
