package com.lkaltz.healthcare.backend.service;

import com.lkaltz.healthcare.backend.model.Hospital;
import com.lkaltz.healthcare.backend.model.Patient;
import com.lkaltz.healthcare.backend.model.Provider;
import com.lkaltz.healthcare.backend.repo.ProviderRepo;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderService {
    @Autowired
    private ProviderRepo providerRepo;
    @Autowired
    private PatientService patientService;
    public Provider getById(Long id){
        return providerRepo.findById(id).get();
    }
    public Provider addNewPatient(Long providerId, Patient patient) throws Exception {

        //need to check if patient already because they can belong to multiple providers

        Patient existingPatient = patientService.getBySsn(patient.getSsn());
        //use existing entity if they exist, otherwise new entity will be created
        if(existingPatient!=null) {
            patient=existingPatient;
        }

        Provider provider = getById(providerId);
        provider.addPatient(patient);
        return providerRepo.save(provider);
    }
}
