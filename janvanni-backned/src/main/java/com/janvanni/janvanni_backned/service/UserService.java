package com.janvanni.janvanni_backned.service;

import com.janvanni.janvanni_backned.Request.ChangePasswordRequest;
import com.janvanni.janvanni_backned.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.nio.channels.MulticastChannel;

public interface UserService {
    User getUserProfile(String jwt);
    User findUserByJwtToken(String jwt) throws Exception;
    User findUserByEmail(String email) throws Exception;
    UserDetails loadUserByUsername(String userName);
    User updateUser(Long id, User user, MultipartFile profilePic) throws Exception;
    User getUserById(Long id) throws Exception;
    void deleteUser(Long id) throws Exception;
    User updateUserPassword(Long id, ChangePasswordRequest request) throws Exception;
}
