package com.janvanni.janvanni_backned.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.janvanni.janvanni_backned.constants.USER_ROLE;
import com.janvanni.janvanni_backned.domain.Address;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String Password;

    private String email;

    private String fullName;

    private String  mobile;

    private USER_ROLE role= USER_ROLE.ROLE_USER;

    @OneToMany
    private Set<Address> address=new HashSet<>();
}
