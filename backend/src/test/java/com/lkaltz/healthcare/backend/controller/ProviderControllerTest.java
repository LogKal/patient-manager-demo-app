package com.lkaltz.healthcare.backend.controller;

import com.lkaltz.healthcare.backend.model.Patient;
import com.lkaltz.healthcare.backend.model.Provider;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProviderControllerTest extends ControllerTestBase {


    @Test
    void addPatient() {
        Patient newPatient = new Patient();
        newPatient.setName("Test Test");
        newPatient.setSsn("4356669999");
        newPatient.setPhoneNumber("111-111-1111");
        Provider provider = restTemplate.postForObject(getRequestUrl("/providers/add-patient/1"), newPatient, Provider.class);
        assertNotNull(provider);
        assertEquals(true, provider.getPatients().stream().anyMatch(p -> p.getSsn().equalsIgnoreCase(newPatient.getSsn())));


        //add existing ssn to new provider
        provider = restTemplate.postForObject(getRequestUrl("/providers/add-patient/2"), newPatient, Provider.class);
        assertEquals(true, provider.getPatients().stream().anyMatch(p -> p.getSsn().equalsIgnoreCase(newPatient.getSsn())));


        //add existing ssn to existing provider
        ResponseEntity<String> response= restTemplate.postForEntity(getRequestUrl("/providers/add-patient/2"), newPatient, String.class);
        assertEquals(500,response.getStatusCode().value());
    }
}