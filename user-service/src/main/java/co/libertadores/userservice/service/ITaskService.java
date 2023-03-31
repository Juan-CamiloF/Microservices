package co.libertadores.userservice.service;

import co.libertadores.userservice.api.Task;
import co.libertadores.userservice.api.request.TaskCreateRequest;
import co.libertadores.userservice.api.request.TaskUpdateRequest;
import co.libertadores.userservice.api.response.TaskCreateUpdateResponse;

import java.util.List;

public interface ITaskService {

    TaskCreateUpdateResponse save(TaskCreateRequest taskCreateRequest);

    Task getTask(Long id);

    List<Task> getTasks(Long userId);

    TaskCreateUpdateResponse update(Long id, TaskUpdateRequest taskUpdateRequest);

    void delete(Long id);

    void deleteByUserId(Long userId);
}
