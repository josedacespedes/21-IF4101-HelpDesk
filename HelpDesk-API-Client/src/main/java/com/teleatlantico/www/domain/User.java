package com.teleatlantico.www.domain;

public class User {
    private int userId;
    private String name;
    private String firstSurname;
    private String secondSurname;
    private String address;
    private int phone;
    private int secondContact;
    private String email;
    private int service;

    public User(int userId, String name, String firstSurname, String secondSurname, String address, int phone, int secondContact, String email, int service){

        this.setUserId(userId);
        this.setName(name);
        this.setFirstSurname(firstSurname);
        this.setSecondSurname(secondSurname);
        this.setAddress(address);
        this.setPhone(phone);
        this.setSecondContact(secondContact);
        this.setEmail(email);
        this.setService(service);
    }


    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public int getSecondContact() {
        return secondContact;
    }

    public void setSecondContact(int secondContact) {
        this.secondContact = secondContact;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getService() {
        return service;
    }

    public void setService(int service) {
        this.service = service;
    }
}
