package com.lkaltz.healthcare.backend.service;

import com.lkaltz.healthcare.backend.model.Patient;
import com.lkaltz.healthcare.backend.model.Provider;
import com.lkaltz.healthcare.backend.repo.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepo patientRepo;

    public Patient getBySsn(String ssn){
        return patientRepo.findBySsn(ssn);
    }

}
