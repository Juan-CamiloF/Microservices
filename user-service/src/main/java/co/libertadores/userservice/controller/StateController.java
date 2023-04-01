package co.libertadores.userservice.controller;

import co.libertadores.userservice.api.State;
import co.libertadores.userservice.service.IStateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/state")
@CrossOrigin(value = "*")
public class StateController {

    private static final Logger logger = LoggerFactory.getLogger(StateController.class);
    private final IStateService stateService;

    public StateController(IStateService stateService) {
        this.stateService = stateService;
    }

    @GetMapping
    public ResponseEntity<List<State>> listStates() {
        logger.info("Petición para obtener estados con el microservicio");
        List<State> list = stateService.getStates();
        logger.info("Respuesta del microservicio: {}", list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
