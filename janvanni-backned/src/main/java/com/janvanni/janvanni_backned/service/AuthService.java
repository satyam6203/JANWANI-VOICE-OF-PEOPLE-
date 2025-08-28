package com.janvanni.janvanni_backned.service;

import com.janvanni.janvanni_backned.Request.LoginRequest;
import com.janvanni.janvanni_backned.Response.AuthResponse;
import com.janvanni.janvanni_backned.Response.SignUpRequest;
import com.janvanni.janvanni_backned.constants.USER_ROLE;

public interface AuthService {
    String createUser(SignUpRequest req) throws Exception;

    void sendLoginOtp(String email, USER_ROLE role) throws Exception;
    AuthResponse signing(LoginRequest request);
}
