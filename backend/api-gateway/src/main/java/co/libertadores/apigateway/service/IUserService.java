package co.libertadores.apigateway.service;

import co.libertadores.apigateway.api.User;
import co.libertadores.apigateway.api.request.UserCreateRequest;
import co.libertadores.apigateway.api.request.UserUpdateRequest;
import co.libertadores.apigateway.api.response.UserCreateUpdateResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IUserService {

    UserCreateUpdateResponse save(UserCreateRequest userCreateRequest);

    Page<User> findAll(int pageNumber, int pageSize);

    List<User> findAllInAList();

    User findById(Long id);

    User findByEmail(String email);

    UserCreateUpdateResponse update(Long id, UserUpdateRequest userUpdateRequest);

    void delete(Long id);

    boolean existsById(Long id);

    boolean existsByEmail(String email);

}
