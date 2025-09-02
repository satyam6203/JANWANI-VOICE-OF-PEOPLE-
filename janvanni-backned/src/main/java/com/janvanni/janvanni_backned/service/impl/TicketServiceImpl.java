package com.janvanni.janvanni_backned.service.impl;

import com.janvanni.janvanni_backned.constants.TicketStatus;
import com.janvanni.janvanni_backned.entity.*;

import com.janvanni.janvanni_backned.repo.TicketRepo;
import com.janvanni.janvanni_backned.repo.UserRepo;
import com.janvanni.janvanni_backned.service.ImageService;
import com.janvanni.janvanni_backned.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketRepo ticketRepository;
    private final UserRepo userRepository;
    private final ImageService imageService;

    @Override
    public Ticket createTicket(Long userId, String title, String description, MultipartFile image) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = imageService.uploadImage(image, "ticket_" + userId + "_" + System.currentTimeMillis());
        }

        Ticket ticket = Ticket.builder()
                .user(user)
                .title(title)
                .description(description)
                .imageUrl(imageUrl)
                .status(TicketStatus.SUBMITTED)
                .build();

        return ticketRepository.save(ticket);
    }

    @Override
    public List<Ticket> getUserTickets(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ticketRepository.findByUser(user);
    }

    @Override
    public Ticket updateTicketStatus(Long ticketId, String status) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setStatus(TicketStatus.valueOf(status.toUpperCase()));
        return ticketRepository.save(ticket);
    }
}
