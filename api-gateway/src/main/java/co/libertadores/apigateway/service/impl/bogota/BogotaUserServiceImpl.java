package co.libertadores.apigateway.service.impl.bogota;

import co.libertadores.apigateway.api.User;
import co.libertadores.apigateway.api.request.UserCreateRequest;
import co.libertadores.apigateway.api.request.UserUpdateRequest;
import co.libertadores.apigateway.api.response.UserCreateUpdateResponse;
import co.libertadores.apigateway.service.IUserService;
import co.libertadores.apigateway.service.exception.MicroserviceException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@Qualifier("bogota")
public class BogotaUserServiceImpl implements IUserService {
    private final String bogotaUserService;
    private final RestTemplate restTemplate;

    public BogotaUserServiceImpl(@Value("${bogota.user.service.url}") String bogotaUserService, RestTemplate restTemplate) {
        this.bogotaUserService = bogotaUserService;
        this.restTemplate = restTemplate;
    }

    @Override
    @Transactional
    public UserCreateUpdateResponse save(UserCreateRequest userCreateRequest) {
        try {
            return restTemplate.postForObject(bogotaUserService, userCreateRequest, UserCreateUpdateResponse.class);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        try {
            return restTemplate.exchange(bogotaUserService, HttpMethod.GET, null, new ParameterizedTypeReference<List<User>>() {
            }).getBody();
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    @Transactional(readOnly = true)
    public User findById(Long id) {
        String url = bogotaUserService + id;
        try {
            return restTemplate.getForObject(url, User.class);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    @Transactional
    public UserCreateUpdateResponse update(Long id, UserUpdateRequest userUpdateRequest) {
        String url = bogotaUserService + id;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<UserUpdateRequest> request = new HttpEntity<>(userUpdateRequest, headers);
        try {
            return restTemplate.exchange(url, HttpMethod.PUT, request, UserCreateUpdateResponse.class).getBody();
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    @Transactional
    public void delete(Long id) {
        String url = bogotaUserService + id;
        try {
            restTemplate.delete(url);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public boolean existsById(Long id) {
        String url = bogotaUserService + id;
        try {
            restTemplate.getForObject(url, User.class);
            return false;
        } catch (Exception e) {
            return true;
        }
    }

}
