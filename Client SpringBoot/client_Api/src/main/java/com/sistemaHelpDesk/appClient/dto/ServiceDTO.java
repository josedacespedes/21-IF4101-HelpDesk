package com.sistemaHelpDesk.appClient.dto;

import com.sistemaHelpDesk.appClient.domain.Service;

import java.util.ArrayList;
import java.util.List;

public class ServiceDTO {
    private int id;
    private String Name;
    //private List<Integer> usersById = new ArrayList<>();
    //private List<Integer> issuesById = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }
}
