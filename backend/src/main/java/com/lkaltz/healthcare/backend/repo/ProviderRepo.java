package com.lkaltz.healthcare.backend.repo;

import com.lkaltz.healthcare.backend.model.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderRepo extends JpaRepository<Provider, Long> {
}
