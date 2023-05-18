package co.libertadores.apigateway.service;

import co.libertadores.apigateway.api.User;
import co.libertadores.apigateway.api.request.UserCreateRequest;
import co.libertadores.apigateway.api.request.UserUpdateRequest;
import co.libertadores.apigateway.api.response.UserCreateUpdateResponse;
import org.springframework.data.domain.Page;

public interface IUserService {

    UserCreateUpdateResponse save(UserCreateRequest userCreateRequest);

    Page<User> findAll(int pageNumber, int pageSize);

    User findById(Long id);

    UserCreateUpdateResponse update(Long id, UserUpdateRequest userUpdateRequest);

    void delete(Long id);

    boolean existsById(Long id);

}
