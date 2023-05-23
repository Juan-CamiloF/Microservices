package co.libertadores.userservice.service;

import co.libertadores.userservice.controller.request.UserCreateRequest;
import co.libertadores.userservice.controller.request.UserUpdateRequest;
import co.libertadores.userservice.entity.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IUserService {

    User save(UserCreateRequest userCreateRequest);

    Page<User> findAll(int pageNumber, int pageSize);

    List<User> findAllInAList();

    User findById(Long id);

    User findByEmail(String email);

    User update(Long id, UserUpdateRequest userUpdateRequest);

    void delete(Long id);

    boolean existsById(Long id);

    boolean existsByEmail(String email);

}
