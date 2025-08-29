package com.janvanni.janvanni_backned.controller;

import com.janvanni.janvanni_backned.entity.User;
import com.janvanni.janvanni_backned.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/janwani")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/user/profile")
    public ResponseEntity<User> getAllDetails(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/update/user")
    public ResponseEntity<User> updateUser(
            @RequestHeader("Authorization") String jwt,
            @RequestBody User user
    ) throws Exception {
        User profile = userService.getUserProfile(jwt);
        User updatedUser = userService.updateUser(profile.getId(),user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/delete/user")
    public ResponseEntity<Void>  deleteUser(@PathVariable long id) throws Exception {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
