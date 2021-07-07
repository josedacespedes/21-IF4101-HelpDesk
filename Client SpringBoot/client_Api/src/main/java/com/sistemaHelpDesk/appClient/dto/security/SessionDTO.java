package com.sistemaHelpDesk.appClient.dto.security;

import java.util.List;

public class SessionDTO {
    private int userId;
    private String token;
    private List<Integer> servicesById;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<Integer> getServicesById() {
        return servicesById;
    }

    public void setServicesById(List<Integer> servicesById) {
        this.servicesById = servicesById;
    }
}
