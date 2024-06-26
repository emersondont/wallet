package com.example.walletapi.repositories;

import com.example.walletapi.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.UUID;

public interface UserRepository extends JpaRepository<UserModel, UUID> {

    UserDetails findByEmail(String email);
    UserModel findModelByEmail(String email);
}
