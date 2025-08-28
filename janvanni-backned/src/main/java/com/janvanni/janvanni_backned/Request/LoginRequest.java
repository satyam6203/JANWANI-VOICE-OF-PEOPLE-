package com.janvanni.janvanni_backned.Request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String otp;
}
