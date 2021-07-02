package com.teleatlantico.www.domain;

import com.sun.istack.internal.NotNull;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "[Service]")
public class Service {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "Name")
    @NotNull
    private String name;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "User_Service",
            joinColumns = @JoinColumn(name = "Id_Service"),
            inverseJoinColumns = @JoinColumn(name="Id_User")
    )
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy="service",
            cascade = CascadeType.ALL)
    private List<Issue> issues = new ArrayList<>();

    public void addUser(User user) {
        this.users.add(user);
        user.getServices().add(this);
    }

    public void removeUser(User user) {
        this.users.remove(user);
        user.getServices().remove(this);
    }

    public void removeUsers() {
        for (User user:this.users)
            removeUser(user);
    }

    public void addIssue(Issue issue) {
        this.issues.add(issue);
        issue.setService(this);
    }

    public void removeIssue(Issue issue) {
        this.issues.remove(issue);
        issue.setService(null);
    }

    public void removeIssues() {
        for (Issue issue:this.issues)
            removeIssue(issue);
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

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Issue> getIssues() {
        return issues;
    }

    public void setIssues(List<Issue> issues) {
        this.issues = issues;
    }
}
