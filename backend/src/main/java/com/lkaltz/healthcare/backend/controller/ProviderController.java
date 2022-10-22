package com.lkaltz.healthcare.backend.controller;

import com.lkaltz.healthcare.backend.model.Hospital;
import com.lkaltz.healthcare.backend.model.Patient;
import com.lkaltz.healthcare.backend.model.Provider;
import com.lkaltz.healthcare.backend.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("providers")
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    @PostMapping(value = "/add-patient/{providerId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Provider addPatient(@PathVariable Long providerId, @RequestBody Patient patient) throws Exception {
        return providerService.addNewPatient(providerId,patient);
    }

    @GetMapping("/find/{providerId}")
    public Provider getByProviderId(@PathVariable Long providerId){
        return providerService.getById(providerId);
    }

}
