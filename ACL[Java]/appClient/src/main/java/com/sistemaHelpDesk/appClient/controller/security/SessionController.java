package com.sistemaHelpDesk.appClient.controller.security;

import com.sistemaHelpDesk.appClient.converter.UserConverter;
import com.sistemaHelpDesk.appClient.domain.Service;
import com.sistemaHelpDesk.appClient.domain.User;
import com.sistemaHelpDesk.appClient.dto.security.LoginDTO;
import com.sistemaHelpDesk.appClient.dto.security.SessionDTO;
import com.sistemaHelpDesk.appClient.exceptions.security.InvalidCredentialsException;
import com.sistemaHelpDesk.appClient.service.security.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class SessionController {
    @Autowired
    private SessionService sessionService;
    @Autowired
    private UserConverter converter;

    @RequestMapping(method = RequestMethod.POST, path = "/api/login")
    public SessionDTO login(@RequestBody LoginDTO dto) {
        User user = sessionService.validateUser(dto.getEmail(), dto.getPass());
        if (user != null) {
            String token = sessionService.buildToken(user.getEmail());
            SessionDTO result = new SessionDTO();
            result.setUserId(user.getId());
            result.setToken(token);
            result.setServicesById(user.getServices().stream()
                    .map(Service::getId).collect(Collectors.toList()));
            return result;
        }
        throw new InvalidCredentialsException();
    }
}
