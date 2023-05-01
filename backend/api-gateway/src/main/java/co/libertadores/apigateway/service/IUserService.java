package co.libertadores.apigateway.service;

import co.libertadores.apigateway.api.User;
import co.libertadores.apigateway.api.request.UserCreateRequest;
import co.libertadores.apigateway.api.request.UserUpdateRequest;
import co.libertadores.apigateway.api.response.UserCreateUpdateResponse;
import java.util.List;

public interface IUserService {

    UserCreateUpdateResponse save(UserCreateRequest userCreateRequest);

    List<User> findAll();

    User findById(Long id);

    UserCreateUpdateResponse update(Long id, UserUpdateRequest userUpdateRequest);

    void delete(Long id);

    boolean existsById(Long id);

}
