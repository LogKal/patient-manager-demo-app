package com.lkaltz.healthcare.backend.repo;

import com.lkaltz.healthcare.backend.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepo extends JpaRepository<Patient, Long> {
    Patient findBySsn(String ssn);
}
