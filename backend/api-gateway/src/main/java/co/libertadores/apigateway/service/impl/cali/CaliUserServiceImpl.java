package co.libertadores.apigateway.service.impl.cali;

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


@Service
@Qualifier("cali")
public class CaliUserServiceImpl implements IUserService {
    private final String caliUserService;
    private final RestTemplate restTemplate;

    public CaliUserServiceImpl(@Value("${cali.user.service.url}") String caliUserService, RestTemplate restTemplate) {
        this.caliUserService = caliUserService;
        this.restTemplate = restTemplate;
    }

    @Override
    @Transactional
    public UserCreateUpdateResponse save(UserCreateRequest userCreateRequest) {
        try {
            return restTemplate.postForObject(caliUserService, userCreateRequest, UserCreateUpdateResponse.class);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Page<User> findAll(int pageNumber, int pageSize) {
        try {
            UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(caliUserService)
                    .queryParam("pageNumber", pageNumber)
                    .queryParam("pageSize", pageSize);
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, null, new ParameterizedTypeReference<RestPageImpl<User>>() {
            }).getBody();
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    @Transactional(readOnly = true)
    public User findById(Long id) {
        String url = caliUserService + id;
        try {
            return restTemplate.getForObject(url, User.class);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    @Transactional
    public UserCreateUpdateResponse update(Long id, UserUpdateRequest userUpdateRequest) {
        String url = caliUserService + id;

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
        String url = caliUserService + id;
        try {
            restTemplate.delete(url);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public boolean existsById(Long id) {
        String url = caliUserService + id;
        try {
            restTemplate.getForObject(url, User.class);
            return false;
        } catch (Exception e) {
            return true;
        }
    }

}
