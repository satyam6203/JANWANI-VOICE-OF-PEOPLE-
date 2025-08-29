package com.janvanni.janvanni_backned.controller;

import com.janvanni.janvanni_backned.entity.User;
import com.janvanni.janvanni_backned.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/janwani")
=======
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
>>>>>>> 05f9b84aa2951f2adb0ec7d7899eb0e27ea0547d
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

<<<<<<< HEAD
    @GetMapping("/user/profile")
=======
    @GetMapping("/profile")
>>>>>>> 05f9b84aa2951f2adb0ec7d7899eb0e27ea0547d
    public ResponseEntity<User> getAllDetails(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(user);
    }
<<<<<<< HEAD

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
=======
}
>>>>>>> 05f9b84aa2951f2adb0ec7d7899eb0e27ea0547d
