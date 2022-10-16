package com.lkaltz.healthcare.backend.controller;

import com.lkaltz.healthcare.backend.model.Hospital;
import com.lkaltz.healthcare.backend.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("hospitals")
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    @GetMapping("/")
    public List<Hospital> getAllHospitals(){
        return hospitalService.getAllHospitals();
    }

}
