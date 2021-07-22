package com.sistemaHelpDesk.appClient.dto;

import com.sistemaHelpDesk.appClient.domain.Comment;
import com.sistemaHelpDesk.appClient.domain.User;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

public class IssueDTO {
    private Integer reportNumber;
    private String description;
    private Date registerTime;
    private String address;
    private String contactPhone;
    private String contactEmail;
    private String status;
    private String supportUserAssigned;
    private Integer userById;
    private Integer serviceById;
    private List<Integer> commentsById = new ArrayList<>();

    public Integer getReportNumber() {
        return reportNumber;
    }

    public void setReportNumber(Integer reportNumber) {
        this.reportNumber = reportNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(Date registerTime) {
        this.registerTime = registerTime;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
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

    public String getSupportUserAssigned() {
        return supportUserAssigned;
    }

    public void setSupportUserAssigned(String supportUserAssigned) {
        this.supportUserAssigned = supportUserAssigned;
    }

    public Integer getUserById() {
        return userById;
    }

    public void setUserById(Integer userById) {
        this.userById = userById;
    }

    public List<Integer> getCommentsById() {
        return commentsById;
    }

    public void setCommentsById(List<Integer> commentsById) {
        this.commentsById = commentsById;
    }

    public Integer getServiceById() {
        return serviceById;
    }

    public void setServiceById(Integer serviceById) {
        this.serviceById = serviceById;
    }
}
