package com.janvanni.janvanni_backned.Response;

import lombok.Data;

@Data
public class SignUpRequest {
    private String email;
    private String password;
    private String otp;
    private String mobileNumber;
    private String fullName;
}
