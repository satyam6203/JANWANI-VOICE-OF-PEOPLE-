package com.janvanni.janvanni_backned.service;

import com.janvanni.janvanni_backned.Request.LoginRequest;
import com.janvanni.janvanni_backned.entity.Admin;

public interface AdminService {

    Admin createAdmin(Admin admin) throws Exception;
//    String signing(LoginRequest request) throws Exception;
}
