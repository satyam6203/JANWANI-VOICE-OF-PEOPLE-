package com.janvanni.janvanni_backned.controller;

import com.janvanni.janvanni_backned.Request.ChangePasswordRequest;
import com.janvanni.janvanni_backned.entity.User;
import com.janvanni.janvanni_backned.repo.UserRepo;
import com.janvanni.janvanni_backned.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/janwani")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepo userRepo;

    @GetMapping("/user/profile")
    public ResponseEntity<User> getAllDetails(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(user);
    }

    @PatchMapping(value = "/user/update", consumes = {"multipart/form-data"})
    public ResponseEntity<User> updateUser(
            @RequestHeader("Authorization") String jwt,
            @RequestPart("user") User user,
            @RequestPart(value = "profileImage", required = false) MultipartFile profilePic
    ) throws Exception {
        User profile = userService.getUserProfile(jwt);
        User updatedUser = userService.updateUser(profile.getId(), user, profilePic);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/user/delete")
    public ResponseEntity<Void>  deleteUser(@PathVariable long id) throws Exception {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{id}/change-password")
    public ResponseEntity<?> changePassword(
            @PathVariable Long id,
            @RequestBody ChangePasswordRequest request) {
        try {
            User updatedUser = userService.updateUserPassword(id, request);
            return ResponseEntity.ok("Password updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }
        return userRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

