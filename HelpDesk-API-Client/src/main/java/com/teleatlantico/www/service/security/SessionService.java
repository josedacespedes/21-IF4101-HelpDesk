package com.teleatlantico.www.service.security;

import com.teleatlantico.www.domain.User;
import com.teleatlantico.www.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.teleatlantico.www.commons.Constants.JWT_ID;
import static com.teleatlantico.www.commons.Constants.SECRET_KEY;


@Service
public class SessionService {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder encoder;

    public User validateUser(String email, String password) {
        User user = userService.findByEmail(email);
        if (user != null && encoder.matches(password, user.getPass()))
            return user;
        return null;
    }

    public String buildToken(String email) {
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("USER");

        String token = Jwts
                .builder()
                .setId(JWT_ID)
                .setSubject(email)
                .claim("authorities", grantedAuthorities.stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 3_600_000))//1 hour
                .signWith(SignatureAlgorithm.HS512,
                        SECRET_KEY.getBytes()).compact();
        return "Bearer " + token;
    }
}
