package com.lkaltz.healthcare.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

public class ControllerTestBase {
    @LocalServerPort
    private int port;
    @Autowired
    public TestRestTemplate restTemplate;

    public String getRequestUrl(String requestMapping){
        return  "http://localhost:" + port + requestMapping;

    }
}
