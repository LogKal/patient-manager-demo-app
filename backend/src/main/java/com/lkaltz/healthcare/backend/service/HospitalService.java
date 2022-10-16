package com.lkaltz.healthcare.backend.service;

import com.lkaltz.healthcare.backend.model.Hospital;
import com.lkaltz.healthcare.backend.repo.HospitalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalService {

    @Autowired
    private HospitalRepo hospitalRepo;

    public List<Hospital> getAllHospitals(){
        return hospitalRepo.findAll();
    }

}
