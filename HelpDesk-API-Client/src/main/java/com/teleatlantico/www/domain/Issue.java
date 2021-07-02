package com.teleatlantico.www.domain;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "[Issue]")
public class Issue {
    @Id
    @Column(name = "ReportNumber")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportNumber;
    @Column(name = "Description")
    @NotNull
    private String description;
    @Column(name = "RegisterTime")
    @NotNull
    private Date registerTime;
    @Column(name = "Address")
    @NotNull
    private String address;
    @Column(name = "ContactPhone")
    @NotNull
    private String contactPhone;
    @Column(name = "SecondPhone")
    @NotNull
    private String secondPhone;
    @Column(name = "ContactEmail")
    @NotNull
    private String contactEmail;
    @Column(name = "Status")
    @NotNull
    private String status;
    @Column(name = "SupportUserAssigned")
    private String supportUserAssigned;

    @ManyToOne
    @JoinColumn(name = "IdUser")
    private User user;

    @ManyToOne
    @JoinColumn(name = "IdService")
    private Service service;

    @OneToMany(mappedBy = "issue",
            cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    public void removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.setIssue(null);
    }
    public int getReportNumber() {
        return reportNumber;
    }

    public void setReportNumber(int reportNumber) {
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
        contactPhone = contactPhone;
    }

    public String getSecondPhone() {return secondPhone; }

    public void setSecondPhone(String secondPhone) {
        secondPhone = contactPhone;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }
}
