package co.libertadores.apigateway.controller;

import co.libertadores.apigateway.api.State;
import co.libertadores.apigateway.service.IStateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(value = "*")
public class StateController {

    private static final Logger logger = LoggerFactory.getLogger(StateController.class);

    private final IStateService bogotaStateService;

    private final IStateService medellinStateService;

    public StateController(@Qualifier("bogota") IStateService bogotaStateService, @Qualifier("medellin") IStateService medellinStateService) {
        this.bogotaStateService = bogotaStateService;
        this.medellinStateService = medellinStateService;
    }

    @GetMapping("/bogota/state")
    public ResponseEntity<List<State>> listBogotaStates() {
        logger.info("Petición para obtener estados de Bogotá con el microservicio");
        List<State> list = bogotaStateService.getStates();
        logger.info("Respuesta del microservicio: {}", list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/medellin/state")
    public ResponseEntity<List<State>> listMedellinStates() {
        logger.info("Petición para obtener estados de Medellín con el microservicio");
        List<State> list = medellinStateService.getStates();
        logger.info("Respuesta del microservicio: {}", list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
