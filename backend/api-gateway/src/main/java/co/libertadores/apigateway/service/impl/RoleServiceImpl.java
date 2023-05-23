package co.libertadores.apigateway.service.impl;

import co.libertadores.apigateway.api.Role;
import co.libertadores.apigateway.service.IRoleService;
import co.libertadores.apigateway.service.exception.MicroserviceException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class RoleServiceImpl implements IRoleService {

    private final String bogotaUserService;

    private final RestTemplate restTemplate;

    public RoleServiceImpl(@Value("${bogota.user.service.url}") String bogotaUserService,
                           RestTemplate restTemplate) {
        this.bogotaUserService = bogotaUserService;
        this.restTemplate = restTemplate;
    }

    @Override
    public List<Role> getUserRole() {
        String url = bogotaUserService + "user-roles";
        try {
            return restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Role>>() {
            }).getBody();
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }
}
