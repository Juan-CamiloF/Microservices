package co.libertadores.taskservice.service;

import co.libertadores.taskservice.controller.request.TaskCreateRequest;
import co.libertadores.taskservice.controller.request.TaskUpdateRequest;
import co.libertadores.taskservice.entity.Task;
import org.springframework.data.domain.Page;

public interface ITaskService {

    Task save(TaskCreateRequest taskCreateRequest);

    Page<Task> findAllByUserId(Long userId, int pageNumber, int pageSize);

    Task findById(Long id);

    Task update(Long id, TaskUpdateRequest taskUpdateRequest);

    void deleteById(Long id);

    void deleteAllByUser(Long id);
}
