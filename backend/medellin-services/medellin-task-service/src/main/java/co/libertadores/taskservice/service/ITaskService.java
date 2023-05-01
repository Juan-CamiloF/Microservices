package co.libertadores.taskservice.service;

import co.libertadores.taskservice.controller.request.TaskCreateRequest;
import co.libertadores.taskservice.controller.request.TaskUpdateRequest;
import co.libertadores.taskservice.entity.Task;

import java.util.List;

public interface ITaskService {

    Task save(TaskCreateRequest taskCreateRequest);

    List<Task> findAllByUserId(Long userId);

    Task findById(Long id);

    Task update(Long id, TaskUpdateRequest taskUpdateRequest);

    void deleteById(Long id);

    void deleteAllByUser(Long id);
}
