package co.libertadores.apigateway.controller;

import co.libertadores.apigateway.api.Task;
import co.libertadores.apigateway.api.request.TaskCreateRequest;
import co.libertadores.apigateway.api.request.TaskUpdateRequest;
import co.libertadores.apigateway.api.response.TaskCreateUpdateResponse;
import co.libertadores.apigateway.service.ITaskService;
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
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    private final ITaskService bogotaTaskService;

    private final ITaskService medellinTaskService;

    public TaskController(@Qualifier("bogota") ITaskService bogotaTaskService, @Qualifier("medellin") ITaskService medellinTaskService) {
        this.bogotaTaskService = bogotaTaskService;
        this.medellinTaskService = medellinTaskService;
    }


    @PostMapping("/bogota/task")
    public ResponseEntity<TaskCreateUpdateResponse> createTaskForBogotaUser(@RequestBody @Valid TaskCreateRequest taskCreateRequest) {
        logger.info("Petición para crear tareas en Bogotá con el microservicio");
        TaskCreateUpdateResponse taskCreateUpdateResponse = bogotaTaskService.save(taskCreateRequest);
        logger.info("Respuesta microservicio: {}", taskCreateUpdateResponse);
        return new ResponseEntity<>(taskCreateUpdateResponse, HttpStatus.OK);
    }

    @PostMapping("/medellin/task")
    public ResponseEntity<TaskCreateUpdateResponse> createTaskForMedellinUser(@RequestBody @Valid TaskCreateRequest taskCreateRequest) {
        logger.info("Petición para crear tareas en Medellín con el microservicio");
        TaskCreateUpdateResponse taskCreateUpdateResponse = medellinTaskService.save(taskCreateRequest);
        logger.info("Respuesta microservicio: {}", taskCreateUpdateResponse);
        return new ResponseEntity<>(taskCreateUpdateResponse, HttpStatus.OK);
    }

    @GetMapping("/bogota/task/by-user/{userId}")
    public ResponseEntity<Page<Task>> getTasksByBogotaUser(@PathVariable Long userId,
                                                           @RequestParam("pageNumber") int pageNumber,
                                                           @RequestParam("pageSize") int pageSize) {
        logger.info("Petición para obtener tareas del microservicio para un usuario de Bogotá");
        Page<Task> page = bogotaTaskService.getTasks(userId, pageNumber, pageSize);
        logger.info("Respuesta microservicio: {}", page.getNumberOfElements());
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/medellin/task/by-user/{userId}")
    public ResponseEntity<Page<Task>> getTasksByMedellinUser(@PathVariable Long userId,
                                                             @RequestParam("pageNumber") int pageNumber,
                                                             @RequestParam("pageSize") int pageSize) {
        logger.info("Petición para obtener tareas del microservicio para un usuario de Medellín");
        Page<Task> page = medellinTaskService.getTasks(userId, pageNumber, pageSize);
        logger.info("Respuesta microservicio: {}", page.getNumberOfElements());
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/bogota/task/{id}")
    public ResponseEntity<Task> getTaskInBogota(@PathVariable Long id) {
        logger.info("Petición para obtener una tarea de Bogotá con el microservicio");
        Task task = bogotaTaskService.getTask(id);
        logger.info("Respuesta microservicio: {}", task);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @GetMapping("/medellin/task/{id}")
    public ResponseEntity<Task> getTaskInMedellin(@PathVariable Long id) {
        logger.info("Petición para obtener una tarea de Medellín con el microservicio");
        Task task = medellinTaskService.getTask(id);
        logger.info("Respuesta microservicio: {}", task);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping("/bogota/task/{id}")
    public ResponseEntity<TaskCreateUpdateResponse> updateTaskInBogota(@PathVariable Long id, @RequestBody TaskUpdateRequest taskUpdateRequest) {
        logger.info("Petición para actualizar una tarea de Bogotá con el microservicio");
        TaskCreateUpdateResponse taskCreateUpdateResponse = bogotaTaskService.update(id, taskUpdateRequest);
        logger.info("Respuesta microservicio: {}", taskCreateUpdateResponse);
        return new ResponseEntity<>(taskCreateUpdateResponse, HttpStatus.CREATED);
    }

    @PutMapping("/medellin/task/{id}")
    public ResponseEntity<TaskCreateUpdateResponse> updateTaskInMedellin(@PathVariable Long id, @RequestBody TaskUpdateRequest taskUpdateRequest) {
        logger.info("Petición para actualizar una tarea de Medellín con el microservicio");
        TaskCreateUpdateResponse taskCreateUpdateResponse = bogotaTaskService.update(id, taskUpdateRequest);
        logger.info("Respuesta microservicio: {}", taskCreateUpdateResponse);
        return new ResponseEntity<>(taskCreateUpdateResponse, HttpStatus.CREATED);
    }

    @DeleteMapping("/bogota/task/{id}")
    public ResponseEntity<Void> deleteTaskInBogota(@PathVariable Long id) {
        logger.info("Petición para eliminar una tarea de Bogotá con el microservicio");
        bogotaTaskService.delete(id);
        logger.info("El microservicio elimino la tarea");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/medellin/task/{id}")
    public ResponseEntity<Void> deleteTaskInMedellin(@PathVariable Long id) {
        logger.info("Petición para eliminar una tarea de Medellín con el microservicio");
        bogotaTaskService.delete(id);
        logger.info("El microservicio elimino la tarea");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
