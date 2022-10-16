package com.lkaltz.healthcare.backend.controller;

import com.lkaltz.healthcare.backend.model.Hospital;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class HospitalControllerTest extends ControllerTestBase {

    @Test
    void getAllHospitals() {
        Hospital[] hospitals = restTemplate.getForObject(getRequestUrl("/hospitals/"), Hospital[].class);
        assertEquals(3, hospitals.length); //setup data has 3 hospitals
    }
}