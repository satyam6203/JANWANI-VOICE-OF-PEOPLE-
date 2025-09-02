package com.janvanni.janvanni_backned.repo;

import com.janvanni.janvanni_backned.entity.Ticket;
import com.janvanni.janvanni_backned.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepo extends JpaRepository<Ticket,Long> {
    List<Ticket> findByUser(User user);
}
