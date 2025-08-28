package com.janvanni.janvanni_backned.Request;

import com.janvanni.janvanni_backned.constants.USER_ROLE;
import lombok.Data;

@Data
public class LoginOtpRequest {
    private String email;
    private String otp;
    private USER_ROLE role;
}
