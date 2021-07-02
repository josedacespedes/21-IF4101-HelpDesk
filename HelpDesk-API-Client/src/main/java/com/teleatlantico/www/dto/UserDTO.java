package com.teleatlantico.www.dto;

import java.util.ArrayList;
import java.util.List;

public class UserDTO {
    private Integer id;
    private String name;
    private String firstSurname;
    private String secondSurname;
    private String address;
    private String phone;
    private String secondContact;
    private String email;
    private String pass;
    private List<Integer> issuesById = new ArrayList<>();
    private List<Integer> servicesById = new ArrayList<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstSurname() {
        return firstSurname;
    }

    public void setFirstSurname(String firstSurname) {
        this.firstSurname = firstSurname;
    }

    public String getSecondSurname() {
        return secondSurname;
    }

    public void setSecondSurname(String secondSurname) {
        this.secondSurname = secondSurname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSecondContact() {
        return secondContact;
    }

    public void setSecondContact(String secondContact) {
        this.secondContact = secondContact;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Integer> getIssuesById() {
        return issuesById;
    }

    public void setIssuesById(List<Integer> issuesById) {
        this.issuesById = issuesById;
    }

    public List<Integer> getServicesById() {
        return servicesById;
    }

    public void setServicesById(List<Integer> servicesById) {
        this.servicesById = servicesById;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }
}