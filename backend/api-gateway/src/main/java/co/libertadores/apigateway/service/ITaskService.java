package co.libertadores.apigateway.service;

import co.libertadores.apigateway.api.Task;
import co.libertadores.apigateway.api.request.TaskCreateRequest;
import co.libertadores.apigateway.api.request.TaskUpdateRequest;
import co.libertadores.apigateway.api.response.TaskCreateUpdateResponse;
import org.springframework.data.domain.Page;

public interface ITaskService {

    TaskCreateUpdateResponse save(TaskCreateRequest taskCreateRequest);

    Task getTask(Long id);

    Page<Task> getTasks(Long userId, int pageNumber, int pageSize);

    TaskCreateUpdateResponse update(Long id, TaskUpdateRequest taskUpdateRequest);

    void delete(Long id);

    void deleteByUserId(Long userId);
}
