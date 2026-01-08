package com.miniplatform.src.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/")
public class ApiController {
    
    @GetMapping("/hi")
    public ResponseEntity<String> getString() {
        return new ResponseEntity<>("Hi from spring boot inside Kuberentes", HttpStatus.OK);
    }

    @GetMapping("/health")
    public ResponseEntity<HttpStatus> getMethodName() {
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
