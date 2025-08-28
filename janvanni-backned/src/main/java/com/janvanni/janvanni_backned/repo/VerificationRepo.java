package com.janvanni.janvanni_backned.repo;

import com.janvanni.janvanni_backned.domain.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationRepo extends JpaRepository<VerificationCode,Long> {

    VerificationCode findByEmail(String req);
}
