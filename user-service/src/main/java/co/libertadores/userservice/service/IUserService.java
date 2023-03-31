package co.libertadores.userservice.service;

import co.libertadores.userservice.controller.request.UserCreateRequest;
import co.libertadores.userservice.controller.request.UserUpdateRequest;
import co.libertadores.userservice.entity.User;
import java.util.List;

public interface IUserService {

    User save(UserCreateRequest userCreateRequest);

    List<User> findAll();

    User findById(Long id);

    User update(Long id, UserUpdateRequest userUpdateRequest);

    void delete(Long id);

    boolean existsById(Long id);

}
