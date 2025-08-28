package com.janvanni.janvanni_backned.repo;

import com.janvanni.janvanni_backned.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin,Long> {
    Admin findByEmail(String email);
}
