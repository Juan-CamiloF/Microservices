package co.libertadores.apigateway.controller;

import co.libertadores.apigateway.api.User;
import co.libertadores.apigateway.api.request.UserCreateRequest;
import co.libertadores.apigateway.api.request.UserUpdateRequest;
import co.libertadores.apigateway.api.response.UserCreateUpdateResponse;
import co.libertadores.apigateway.service.ITaskService;
import co.libertadores.apigateway.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/api/v1")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final IUserService bogotaUserService;

    private final IUserService medellinUserService;
    private final IUserService caliUserService;

    private final ITaskService bogotaTaskService;

    private final ITaskService medellinTaskService;

    private final ITaskService caliTaskService;

    public UserController(@Qualifier("bogota") IUserService bogotaUserService, @Qualifier("bogota") ITaskService bogotaTaskService,
                          @Qualifier("medellin") IUserService medellinUserService, @Qualifier("medellin") ITaskService medellinTaskService,
                          @Qualifier("cali") IUserService caliUserService, @Qualifier("cali") ITaskService caliTaskService) {
        this.bogotaUserService = bogotaUserService;
        this.medellinUserService = medellinUserService;
        this.caliUserService = caliUserService;
        this.bogotaTaskService = bogotaTaskService;
        this.medellinTaskService = medellinTaskService;
        this.caliTaskService = caliTaskService;
    }

    @PostMapping("/bogota/user")
    public ResponseEntity<UserCreateUpdateResponse> createUserBogota(@Valid @RequestBody UserCreateRequest userCreateRequest) {
        logger.info("Petición para crear usuario en Bogotá con el microservicio");
        UserCreateUpdateResponse userCreateUpdateResponse = bogotaUserService.save(userCreateRequest);
        logger.info("Respuesta microservicio: {}", userCreateUpdateResponse);
        return new ResponseEntity<>(userCreateUpdateResponse, HttpStatus.CREATED);
    }

    @PostMapping("/medellin/user")
    public ResponseEntity<UserCreateUpdateResponse> createUserMedellin(@Valid @RequestBody UserCreateRequest userCreateRequest) {
        logger.info("Petición para crear usuario en Medellín con el microservicio");
        UserCreateUpdateResponse userCreateUpdateResponse = medellinUserService.save(userCreateRequest);
        logger.info("Respuesta microservicio: {}", userCreateUpdateResponse);
        return new ResponseEntity<>(userCreateUpdateResponse, HttpStatus.CREATED);
    }

    @PostMapping("/cali/user")
    public ResponseEntity<UserCreateUpdateResponse> createUserCali(@Valid @RequestBody UserCreateRequest userCreateRequest) {
        logger.info("Petición para crear usuario en Cali con el microservicio");
        UserCreateUpdateResponse userCreateUpdateResponse = caliUserService.save(userCreateRequest);
        logger.info("Respuesta microservicio: {}", userCreateUpdateResponse);
        return new ResponseEntity<>(userCreateUpdateResponse, HttpStatus.CREATED);
    }

    @GetMapping("/bogota/user")
    public ResponseEntity<Page<User>> userPageBogota(@RequestParam("pageNumber") int pageNumber, @RequestParam("pageSize") int pageSize) {
        logger.info("Petición para listar los usuarios de Bogotá");
        Page<User> page = bogotaUserService.findAll(pageNumber, pageSize);
        logger.info("Respuesta microservicio: {}", page.getNumberOfElements());
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/medellin/user")
    public ResponseEntity<Page<User>> userPageMedellin(@RequestParam("pageNumber") int pageNumber, @RequestParam("pageSize") int pageSize) {
        logger.info("Petición para listar los usuarios de Medellín");
        Page<User> page = medellinUserService.findAll(pageNumber, pageSize);
        logger.info("Respuesta microservicio: {}", page.getNumberOfElements());
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/cali/user")
    public ResponseEntity<Page<User>> userPageCali(@RequestParam("pageNumber") int pageNumber, @RequestParam("pageSize") int pageSize) {
        logger.info("Petición para listar los usuarios de Cali");
        Page<User> page = caliUserService.findAll(pageNumber, pageSize);
        logger.info("Respuesta microservicio: {}", page.getNumberOfElements());
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/bogota/user/{id}")
    public ResponseEntity<User> getUserInBogota(@PathVariable Long id) {
        logger.info("Petición para obtener un usuario de Bogotá por id {}", id);
        User user = bogotaUserService.findById(id);
        logger.info("Usuario obtenido: {}", user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/medellin/user/{id}")
    public ResponseEntity<User> getUserInMedellin(@PathVariable Long id) {
        logger.info("Petición para obtener un usuario de Medellín por id {}", id);
        User user = medellinUserService.findById(id);
        logger.info("Usuario obtenido: {}", user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/cali/user/{id}")
    public ResponseEntity<User> getUserInCali(@PathVariable Long id) {
        logger.info("Petición para obtener un usuario de Cali por id {}", id);
        User user = caliUserService.findById(id);
        logger.info("Usuario obtenido: {}", user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/bogota/user/{id}")
    public ResponseEntity<UserCreateUpdateResponse> updateUserBogota(@PathVariable Long id, @RequestBody @Valid UserUpdateRequest userUpdateRequest) {
        logger.info("Petición para actualizar un usuario de Bogotá con el microservicio");
        UserCreateUpdateResponse userCreateUpdateResponse = bogotaUserService.update(id, userUpdateRequest);
        logger.info("Respuesta microservicio: {}", userCreateUpdateResponse);
        return new ResponseEntity<>(userCreateUpdateResponse, HttpStatus.CREATED);
    }

    @PutMapping("/medellin/user/{id}")
    public ResponseEntity<UserCreateUpdateResponse> updateUserMedellin(@PathVariable Long id, @RequestBody @Valid UserUpdateRequest userUpdateRequest) {
        logger.info("Petición para actualizar un usuario de Medellín con el microservicio");
        UserCreateUpdateResponse userCreateUpdateResponse = medellinUserService.update(id, userUpdateRequest);
        logger.info("Respuesta microservicio: {}", userCreateUpdateResponse);
        return new ResponseEntity<>(userCreateUpdateResponse, HttpStatus.CREATED);
    }

    @PutMapping("/cali/user/{id}")
    public ResponseEntity<UserCreateUpdateResponse> updateUserCali(@PathVariable Long id, @RequestBody @Valid UserUpdateRequest userUpdateRequest) {
        logger.info("Petición para actualizar un usuario de Cali con el microservicio");
        UserCreateUpdateResponse userCreateUpdateResponse = caliUserService.update(id, userUpdateRequest);
        logger.info("Respuesta microservicio: {}", userCreateUpdateResponse);
        return new ResponseEntity<>(userCreateUpdateResponse, HttpStatus.CREATED);
    }

    @DeleteMapping("/bogota/user/{id}")
    public ResponseEntity<Void> deleteUserBogota(@PathVariable Long id) {
        logger.info("Petición para eliminar un usuario de Bogotá por id {}", id);
        bogotaTaskService.deleteByUserId(id);
        logger.info("Tareas del usuario eliminadas");
        bogotaUserService.delete(id);
        logger.info("Usuario eliminado");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/medellin/user/{id}")
    public ResponseEntity<Void> deleteUserMedellin(@PathVariable Long id) {
        logger.info("Petición para eliminar un usuario de Medellín por id {}", id);
        medellinTaskService.deleteByUserId(id);
        logger.info("Tareas del usuario eliminadas");
        medellinUserService.delete(id);
        logger.info("Usuario eliminado");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/cali/user/{id}")
    public ResponseEntity<Void> deleteUserCali(@PathVariable Long id) {
        logger.info("Petición para eliminar un usuario de Cali por id {}", id);
        caliTaskService.deleteByUserId(id);
        logger.info("Tareas del usuario eliminadas");
        caliUserService.delete(id);
        logger.info("Usuario eliminado");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
