package co.libertadores.taskservice.controller;

import co.libertadores.taskservice.controller.request.TaskCreateRequest;
import co.libertadores.taskservice.controller.request.TaskUpdateRequest;
import co.libertadores.taskservice.controller.response.TaskCreateUpdateResponse;
import co.libertadores.taskservice.entity.Task;
import co.libertadores.taskservice.service.ITaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/api/v1/bogota/task-service")
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);
    private final ITaskService taskService;

    private static final String CREATED_TASK = "Tarea creada";

    private static final String UPDATED_TASK = "Tarea actualizada";

    public TaskController(ITaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<TaskCreateUpdateResponse> createTask(@RequestBody TaskCreateRequest taskCreateRequest) {
        logger.info("Petición para crear una tarea");
        Task newTask = taskService.save(taskCreateRequest);
        TaskCreateUpdateResponse response = new TaskCreateUpdateResponse(CREATED_TASK, newTask);
        logger.info("{}", response);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<Page<Task>> taskPageByUserId(@PathVariable Long userId, @RequestParam("pageNumber") int pageNumber, @RequestParam("pageSize") int pageSize) {
        logger.info("Petición para listar tareas del usuario");
        Page<Task> page = taskService.findAllByUserId(userId, pageNumber, pageSize);
        logger.info("Cantidad de tareas obtenidas {}", page.getNumberOfElements());
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        logger.info("Petición para obtener una tarea por id {}", id);
        Task task = taskService.findById(id);
        logger.info("{}", task);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskCreateUpdateResponse> updateTask(@PathVariable Long id, @RequestBody TaskUpdateRequest taskUpdateRequest) {
        logger.info("Petición para actualizar una tarea");
        Task updateTask = taskService.update(id, taskUpdateRequest);
        TaskCreateUpdateResponse response = new TaskCreateUpdateResponse(UPDATED_TASK, updateTask);
        logger.info("{}", response);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        logger.info("Petición para eliminar una tarea");
        taskService.deleteById(id);
        logger.info("Tarea eliminada");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/by-user/{userId}")
    public ResponseEntity<Void> deleteAllTaskByUser(@PathVariable Long userId) {
        logger.info("Petición para eliminar las tareas de un usuarios");
        taskService.deleteAllByUser(userId);
        logger.info("Tareas eliminadas");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
