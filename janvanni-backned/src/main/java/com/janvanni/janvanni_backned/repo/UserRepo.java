package com.janvanni.janvanni_backned.repo;

import com.janvanni.janvanni_backned.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
    User findByEmail(String email);
}
