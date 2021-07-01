package com.teleatlantico.www.domain;

public class Support {

    private int id;
    private String name;
    private String firstSurname;
    private String secondSurname;
    private String email;

    public Support(){

    }

    public Support(int id, String name, String firstSurname, String secondSurname, String email) {
        this.setId(id);
        this.setName(name);
        this.setFirstSurname(firstSurname);
        this.setSecondSurname(secondSurname);
        this.setEmail(email);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
