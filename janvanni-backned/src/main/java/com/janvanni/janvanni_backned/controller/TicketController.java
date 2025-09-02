package com.janvanni.janvanni_backned.controller;

import com.janvanni.janvanni_backned.entity.Ticket;
import com.janvanni.janvanni_backned.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/janwani/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping("/create")
    public ResponseEntity<Ticket> createTicket(
            @RequestParam Long userId,
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile image
    ) {
        return ResponseEntity.ok(ticketService.createTicket(userId, title, description, image));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Ticket>> getUserTickets(@PathVariable Long userId) {
        return ResponseEntity.ok(ticketService.getUserTickets(userId));
    }

    @PatchMapping("/{ticketId}/status")
    public ResponseEntity<Ticket> updateTicketStatus(
            @PathVariable Long ticketId,
            @RequestParam String status
    ) {
        return ResponseEntity.ok(ticketService.updateTicketStatus(ticketId, status));
    }
}
