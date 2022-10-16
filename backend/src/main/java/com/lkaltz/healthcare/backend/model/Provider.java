package com.lkaltz.healthcare.backend.model;


import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.ser.Serializers;
import com.lkaltz.healthcare.backend.model.base.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Setter
@Getter
@Entity
public class Provider extends BaseModel {
    private String name;
    private String specialty;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "hospital_id" )
    @JsonIgnore
    private Hospital hospital;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "patient_provider",
            joinColumns = @JoinColumn(name = "provider_id", columnDefinition = "bigint", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "patient_id", columnDefinition = "bigint", nullable = false))
    private Set<Patient> patients;

    public void addPatient(Patient patient) throws Exception {
        //patients can belong to multiple provider, but not to the same provider multiple times
        if(this.patients.stream().anyMatch(p -> p.getSsn().equalsIgnoreCase(patient.getSsn()))){
            throw new Exception("Patient with SSN already exists for provider");
        }
        this.patients.add(patient);
    }

}
