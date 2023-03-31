package co.libertadores.userservice.controller;

import co.libertadores.userservice.api.Task;
import co.libertadores.userservice.api.request.TaskCreateRequest;
import co.libertadores.userservice.api.request.TaskUpdateRequest;
import co.libertadores.userservice.api.response.TaskCreateUpdateResponse;
import co.libertadores.userservice.service.ITaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/api/v1/task")
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    private final ITaskService taskService;

    public TaskController(ITaskService taskService) {
        this.taskService = taskService;
    }


    @PostMapping
    public ResponseEntity<TaskCreateUpdateResponse> createTaskForUser(@RequestBody @Valid TaskCreateRequest taskCreateRequest) {
        logger.info("Petición para crear tareas con el microservicio");
        TaskCreateUpdateResponse taskCreateUpdateResponse = taskService.save(taskCreateRequest);
        logger.info("Respuesta microservicio: {}", taskCreateUpdateResponse);
        return new ResponseEntity<>(taskCreateUpdateResponse, HttpStatus.OK);
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<Task>> getTasksByUser(@PathVariable Long userId) {
        logger.info("Petición para obtener tareas del microservicio");
        List<Task> list = taskService.getTasks(userId);
        logger.info("Respuesta microservicio: {}", list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        logger.info("Petición para obtener una tarea con el microservicio");
        Task task = taskService.getTask(id);
        logger.info("Respuesta microservicio: {}", task);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskCreateUpdateResponse> updateTask(@PathVariable Long id, @RequestBody TaskUpdateRequest taskUpdateRequest) {
        logger.info("Petición para actualizar una tarea con el microservicio");
        TaskCreateUpdateResponse taskCreateUpdateResponse = taskService.update(id, taskUpdateRequest);
        logger.info("Respuesta microservicio: {}", taskCreateUpdateResponse);
        return new ResponseEntity<>(taskCreateUpdateResponse, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        logger.info("Petición para eliminar una tarea con el microservicio");
        taskService.delete(id);
        logger.info("El microservicio elimino la tarea");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
