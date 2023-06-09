package co.libertadores.apigateway.service.impl.medellin;

import co.libertadores.apigateway.api.RestPageImpl;
import co.libertadores.apigateway.api.User;
import co.libertadores.apigateway.api.request.UserCreateRequest;
import co.libertadores.apigateway.api.request.UserUpdateRequest;
import co.libertadores.apigateway.api.response.UserCreateUpdateResponse;
import co.libertadores.apigateway.service.IUserService;
import co.libertadores.apigateway.service.exception.MicroserviceException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
@Qualifier("medellin")
public class MedellinUserServiceImpl implements IUserService {
    private final String medellinUserService;

    private final RestTemplate restTemplate;

    public MedellinUserServiceImpl(@Value("${medellin.user.service.url}") String medellinUserService,
                                   RestTemplate restTemplate) {
        this.medellinUserService = medellinUserService;
        this.restTemplate = restTemplate;
    }

    @Override
    public UserCreateUpdateResponse save(UserCreateRequest userCreateRequest) {
        try {
            return restTemplate.postForObject(medellinUserService, userCreateRequest, UserCreateUpdateResponse.class);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public Page<User> findAll(int pageNumber, int pageSize) {
        try {
            UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(medellinUserService)
                    .queryParam("pageNumber", pageNumber)
                    .queryParam("pageSize", pageSize);
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, null, new ParameterizedTypeReference<RestPageImpl<User>>() {
            }).getBody();
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public List<User> findAllInAList() {
        String url = medellinUserService + "/list";
        return restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<User>>() {
        }).getBody();
    }

    @Override
    public User findById(Long id) {
        String url = medellinUserService + id;
        try {
            return restTemplate.getForObject(url, User.class);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public User findByEmail(String email) {
        String url = medellinUserService + "email/" + email;
        try {
            return restTemplate.getForObject(url, User.class);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public UserCreateUpdateResponse update(Long id, UserUpdateRequest userUpdateRequest) {
        String url = medellinUserService + id;

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
        String url = medellinUserService + id;
        try {
            restTemplate.delete(url);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public boolean existsById(Long id) {
        String url = medellinUserService + id;
        try {
            restTemplate.getForObject(url, User.class);
            return false;
        } catch (Exception e) {
            return true;
        }
    }

    @Override
    public boolean existsByEmail(String email) {
        String url = medellinUserService + "email-exists/" + email;
        try {
            return Boolean.TRUE.equals(restTemplate.getForObject(url, Boolean.class));
        } catch (Exception e) {
            return false;
        }
    }

}
