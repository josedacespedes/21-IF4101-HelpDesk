package com.teleatlantico.www.domain;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name = "[User]")
@Entity
public class User {
    @Id
    @Column(name = "UserId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    @Column(name = "Name")
    @NotNull
    private String name;
    @Column(name = "FirstSurname")
    @NotNull
    private String firstSurname;
    @Column(name = "SecondSurname")
    @NotNull
    private String secondSurname;
    @Column(name = "Address")
    @NotNull
    private String address;
    @Column(name = "Phone")
    @NotNull
    private String phone;
    @Column(name = "SecondContact")
    @NotNull
    private String secondContact;
    @Column(name = "Email")
    @NotNull
    private String email;

    @ManyToMany(mappedBy = "users",
            cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Service> services = new ArrayList<>();

    @OneToMany(mappedBy="user",
            cascade = CascadeType.ALL)
    private List<Issue> issues = new ArrayList<>();

    public void addService(Service service) {
        this.services.add(service);
        service.getUsers().add(this);
    }
    public void removeService(Service service) {
        this.services.remove(service);
        service.getUsers().remove(this);
    }
    public void removeIssue(Issue issue) {
        this.issues.remove(issue);
        issue.setUser(null);
    }

    public int getId() {
        return userId;
    }

    public void setId(int id) {
        this.userId = id;
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

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }

    public List<Issue> getIssues() {
        return issues;
    }

    public void setIssues(List<Issue> issues) {
        this.issues = issues;
    }

}
