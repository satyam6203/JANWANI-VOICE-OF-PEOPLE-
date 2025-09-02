package com.janvanni.janvanni_backned.service;

import com.janvanni.janvanni_backned.entity.Ticket;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TicketService {
    Ticket createTicket(Long userId, String title, String description, MultipartFile image);
    List<Ticket> getUserTickets(Long userId);
    Ticket updateTicketStatus(Long ticketId, String status);
}
