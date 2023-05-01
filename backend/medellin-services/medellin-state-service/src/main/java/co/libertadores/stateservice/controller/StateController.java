package co.libertadores.stateservice.controller;

import co.libertadores.stateservice.entity.State;
import co.libertadores.stateservice.service.IStateService;
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
@CrossOrigin(value = "*")
@RequestMapping("/api/v1/medellin/state-service")
public class StateController {

    private static final Logger logger = LoggerFactory.getLogger(StateController.class);
    private final IStateService stateService;

    public StateController(IStateService stateService) {
        this.stateService = stateService;
    }


    @GetMapping
    public ResponseEntity<List<State>> listStates() {
        logger.info("Petición para obtener los estados");
        List<State> list = stateService.findAll();
        logger.info("{}", list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
