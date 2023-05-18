package co.libertadores.userservice.controller;

import co.libertadores.userservice.controller.request.UserCreateRequest;
import co.libertadores.userservice.controller.request.UserUpdateRequest;
import co.libertadores.userservice.controller.response.UserCreateUpdateResponse;
import co.libertadores.userservice.entity.User;
import co.libertadores.userservice.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/api/v1/bogota/user-service")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final IUserService userService;

    private static final String CREATED_USER = "Usuario creado";

    private static final String UPDATED_USER = "Usuario actualizado";

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserCreateUpdateResponse> createUser(@Valid @RequestBody UserCreateRequest userCreateRequest) {
        logger.info("Petición para crear el siguiente usuario: {}", userCreateRequest);
        User newUser = userService.save(userCreateRequest);
        UserCreateUpdateResponse response = new UserCreateUpdateResponse(CREATED_USER, newUser);
        logger.info("{}", response);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<User>> usersPage(@RequestParam("pageNumber") int pageNumber, @RequestParam("pageSize") int pageSize) {
        logger.info("Petición para listar los usuarios");
        Page<User> page = userService.findAll(pageNumber, pageSize);
        logger.info("Cantidad de usuarios obtenidos {}", page.getNumberOfElements());
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        logger.info("Petición para obtener un usuario por id {}", id);
        User user = userService.findById(id);
        logger.info("Usuario obtenido: {}", user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserCreateUpdateResponse> updateUser(@PathVariable Long id, @RequestBody @Valid UserUpdateRequest userUpdateRequest) {
        logger.info("Petición para actualizar el siguiente usuario: {}", userUpdateRequest);
        User user = userService.update(id, userUpdateRequest);
        UserCreateUpdateResponse response = new UserCreateUpdateResponse(UPDATED_USER, user);
        logger.info("{}", response);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        logger.info("Petición para eliminar un usuario por id {}", id);
        userService.delete(id);
        logger.info("Usuario eliminado");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
