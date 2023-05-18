package co.libertadores.userservice.service.impl;

import co.libertadores.userservice.controller.request.UserCreateRequest;
import co.libertadores.userservice.controller.request.UserUpdateRequest;
import co.libertadores.userservice.entity.User;
import co.libertadores.userservice.repository.IUserRepository;
import co.libertadores.userservice.service.IUserService;
import co.libertadores.userservice.service.exception.UserException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class UserServiceImpl implements IUserService {


    private static final String EMAIL_IN_USE = "El correo ya se encuentra registrado";

    private static final String USER_DOES_NOT_EXISTS = "El usuario no existe";

    private static final String INVALID_USER = "El usuario no es válido";

    private final IUserRepository userRepository;

    private final ModelMapper modelMapper;


    public UserServiceImpl(IUserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public User save(UserCreateRequest userCreateRequest) {
        if (userRepository.existsByEmail(userCreateRequest.getEmail())) throw new UserException(EMAIL_IN_USE);
        User newUser = userToCreateConvertToEntity(userCreateRequest);
        return userRepository.save(newUser);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<User> findAll(int pageNumber, int pageSize) {
        return userRepository.findAll(PageRequest.of(pageNumber, pageSize));
    }

    @Override
    @Transactional(readOnly = true)
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserException(USER_DOES_NOT_EXISTS));
    }

    @Override
    @Transactional
    public User update(Long id, UserUpdateRequest userUpdateRequest) {
        if (!id.equals(userUpdateRequest.getId())) throw new UserException(INVALID_USER);
        User user = userRepository.findById(id).orElseThrow(() -> new UserException(USER_DOES_NOT_EXISTS));
        if (!userUpdateRequest.getEmail().equals(user.getEmail()) && (userRepository.existsByEmail(userUpdateRequest.getEmail()))) {
            throw new UserException(EMAIL_IN_USE);
        }
        User updatedUser = userToUpdateConvertToEntity(userUpdateRequest);
        updatedUser.setUpdatedAt(LocalDate.now());
        return userRepository.save(updatedUser);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserException(USER_DOES_NOT_EXISTS));
        userRepository.delete(user);
    }

    @Override
    public boolean existsById(Long id) {
        return !userRepository.existsById(id);
    }

    public User userToCreateConvertToEntity(UserCreateRequest userCreateRequest) {
        return modelMapper.map(userCreateRequest, User.class);
    }

    public User userToUpdateConvertToEntity(UserUpdateRequest userUpdateRequest) {
        return modelMapper.map(userUpdateRequest, User.class);
    }
}
