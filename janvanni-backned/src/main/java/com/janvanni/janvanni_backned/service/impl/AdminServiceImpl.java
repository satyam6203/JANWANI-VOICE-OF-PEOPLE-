package com.janvanni.janvanni_backned.service.impl;

import com.janvanni.janvanni_backned.config.JwtProvider;
import com.janvanni.janvanni_backned.constants.USER_ROLE;
import com.janvanni.janvanni_backned.entity.Admin;
import com.janvanni.janvanni_backned.repo.AdminRepo;
import com.janvanni.janvanni_backned.repo.VerificationRepo;
import com.janvanni.janvanni_backned.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final AdminRepo adminRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final VerificationRepo verificationRepo;

    @Override
    public Admin createAdmin(Admin admin) throws Exception {
        Admin userExist = adminRepo.findByEmail(admin.getEmail());

        if(userExist != null){
            throw  new Exception("Seller Already exist by this email use another account..");
        }

        Admin newAdmin = new Admin();
        newAdmin.setEmail(admin.getEmail());
        newAdmin.setPassword(passwordEncoder.encode(admin.getPassword()));
        newAdmin.setFullName(admin.getFullName());
        newAdmin.setRole(USER_ROLE.ROLE_ADMIN);
        newAdmin.setMobile(admin.getMobile());

        return adminRepo.save(newAdmin);
    }

}


