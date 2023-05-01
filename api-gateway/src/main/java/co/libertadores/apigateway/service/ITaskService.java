package co.libertadores.apigateway.service;

import co.libertadores.apigateway.api.Task;
import co.libertadores.apigateway.api.request.TaskCreateRequest;
import co.libertadores.apigateway.api.request.TaskUpdateRequest;
import co.libertadores.apigateway.api.response.TaskCreateUpdateResponse;

import java.util.List;

public interface ITaskService {

    TaskCreateUpdateResponse save(TaskCreateRequest taskCreateRequest);

    Task getTask(Long id);

    List<Task> getTasks(Long userId);

    TaskCreateUpdateResponse update(Long id, TaskUpdateRequest taskUpdateRequest);

    void delete(Long id);

    void deleteByUserId(Long userId);
}
