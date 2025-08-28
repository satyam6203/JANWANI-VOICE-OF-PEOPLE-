package com.janvanni.janvanni_backned.Response;

import com.janvanni.janvanni_backned.constants.USER_ROLE;
import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private String message;
    private USER_ROLE role;
}
