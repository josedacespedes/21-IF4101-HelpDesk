package com.teleatlantico.www.domain;

import java.util.Date;

public class Issue {
    private int issueId;
    private String description;
    private int report;
    private Date register;
    private String address;
    private int contactPhone;
    private int secondPhone;
    private String contactEmail;
    private String status;
    private int supportUserAsigned;

    public Issue(){

    }

    public Issue(int issueId, String description, int report, Date register, String address, int contactPhone, int secondPhone, String contactEmail, String status, int supportUserAsigned) {
        this.setIssueId(issueId);
        this.setDescription(description);
        this.setReport(report);
        this.setRegister(register);
        this.setAddress(address);
        this.setContactPhone(contactPhone);
        this.setSecondPhone(secondPhone);
        this.setContactEmail(contactEmail);
        this.setStatus(status);
        this.setSupportUserAsigned(supportUserAsigned);
    }


    public int getIssueId() {
        return issueId;
    }

    public void setIssueId(int issueId) {
        this.issueId = issueId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getReport() {
        return report;
    }

    public void setReport(int report) {
        this.report = report;
    }

    public Date getRegister() {
        return register;
    }

    public void setRegister(Date register) {
        this.register = register;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(int contactPhone) {
        this.contactPhone = contactPhone;
    }

    public int getSecondPhone() {
        return secondPhone;
    }

    public void setSecondPhone(int secondPhone) {
        this.secondPhone = secondPhone;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getSupportUserAsigned() {
        return supportUserAsigned;
    }

    public void setSupportUserAsigned(int supportUserAsigned) {
        this.supportUserAsigned = supportUserAsigned;
    }
}
