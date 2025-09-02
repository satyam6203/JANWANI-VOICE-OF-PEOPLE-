package com.janvanni.janvanni_backned.service.impl;

import com.janvanni.janvanni_backned.Request.ChangePasswordRequest;
import com.janvanni.janvanni_backned.config.JwtProvider;
import com.janvanni.janvanni_backned.constants.USER_ROLE;
import com.janvanni.janvanni_backned.entity.Admin;
import com.janvanni.janvanni_backned.entity.User;
import com.janvanni.janvanni_backned.repo.AdminRepo;
import com.janvanni.janvanni_backned.repo.UserRepo;
import com.janvanni.janvanni_backned.service.ImageService;
import com.janvanni.janvanni_backned.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.channels.MulticastChannel;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final AdminRepo adminRepo;
    private final UserRepo userRepo;
    private static final String USER_PREFIX = "admin_";
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final ImageService imageService;

    @Override
    public User getUserProfile(String jwt) {
        if (jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }

        String email = jwtProvider.getEmailFromToken(jwt);

        return userRepo.findByEmail(email);
    }


    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromToken(jwt);
        return this.findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepo.findByEmail(email);
        if(user ==  null){
            throw  new Exception("User not found with this email ->"+email);
        }
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if(username.startsWith(USER_PREFIX)){
            String ActualUserName = username.substring(USER_PREFIX.length());
            Admin admin = adminRepo.findByEmail(ActualUserName);
            if(admin != null){
                return buildUserDetails(
                        admin.getEmail(),
                        admin.getPassword(),
                        admin.getRole()
                );
            }
        }else{
            User user = userRepo.findByEmail(username);
            if(user != null){
                return buildUserDetails(user.getEmail(),user.getPassword(),user.getRole());
            }
        }
        throw  new UsernameNotFoundException("User or seller not found by this email"+username);
    }

    @Override
    public User updateUser(Long id, User user, MultipartFile profilePic) throws Exception {
        // Fetch existing user
        User existUser = getUserById(id);

        // Update name
        if (user.getFullName() != null && !user.getFullName().isEmpty()) {
            existUser.setFullName(user.getFullName());
        }

        // Update mobile
        if (user.getMobile() != null && !user.getMobile().isEmpty()) {
            existUser.setMobile(user.getMobile());
        }

        // Update email
        if (user.getEmail() != null && !user.getEmail().isEmpty()) {
            existUser.setEmail(user.getEmail());
        }

        // Upload profile image to Cloudinary
        if (profilePic != null && !profilePic.isEmpty()) {
            String imageUrl = imageService.uploadImage((MultipartFile) profilePic, "user_" + id + "_profile");
            existUser.setProfilePic(imageUrl);
        }


        // Save updated user
        return userRepo.save(existUser);
    }

    @Override
    public User getUserById(Long id) throws Exception {
        return userRepo.findById(id)
                .orElseThrow(()->new Exception("User not find by this id ->"+id));
    }

    @Override
    public void deleteUser(Long id) throws Exception {
        User existById=getUserById(id);

        if(existById == null){
            throw new Exception("User not exist By this id ");
        }
        userRepo.deleteById(id);
    }

    @Override
    public User updateUserPassword(Long id, ChangePasswordRequest request) throws Exception {
        User existUser = getUserById(id);

        if (!passwordEncoder.matches(request.getOldPassword(), existUser.getPassword())) {
            throw new Exception("Old password is incorrect!");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new Exception("New password and confirm password do not match!");
        }

        if (passwordEncoder.matches(request.getNewPassword(), existUser.getPassword())) {
            throw new Exception("New password cannot be the same as the old password!");
        }

        existUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
        return userRepo.save(existUser);
    }


    private UserDetails buildUserDetails(String email, String password, USER_ROLE role) {
        if(role == null){
            role = USER_ROLE.ROLE_USER;
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role.toString()));
        return new org.springframework.security.core.userdetails.User(
                email,
                password,
                authorities
        );
    }

}
