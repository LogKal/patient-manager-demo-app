package com.lkaltz.healthcare.backend.model;

import com.fasterxml.jackson.annotation.*;
import com.lkaltz.healthcare.backend.model.base.BaseModel;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
public class Patient extends BaseModel {
    @Column(unique=true)
    private String ssn;
    private String name;
    private String phoneNumber;

    @ManyToMany(mappedBy = "patients")
    @JsonIgnore
    private Set<Provider> providers = new HashSet<>();

}
