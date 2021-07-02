package com.teleatlantico.www.domain;

import com.sun.istack.NotNull;

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
            name = "ClientService",
            joinColumns = @JoinColumn(name = "IdService"),
            inverseJoinColumns = @JoinColumn(name="IdUser")
    )
    private List<User> users = new ArrayList<>();

    public void removeUser(User user) {
        this.users.remove(user);
        user.getServices().remove(this);
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
}
