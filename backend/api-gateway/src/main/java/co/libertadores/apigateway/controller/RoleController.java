package co.libertadores.apigateway.controller;

import co.libertadores.apigateway.api.Role;
import co.libertadores.apigateway.service.IRoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/role")
public class RoleController {

    private static final Logger logger = LoggerFactory.getLogger(RoleController.class);
    private final IRoleService roleService;

    public RoleController(IRoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<Role>> getUserRoles() {
        logger.info("Petición para obtener roles");
        List<Role> roles = roleService.getUserRole();
        logger.info("{}", roles);
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }
}
