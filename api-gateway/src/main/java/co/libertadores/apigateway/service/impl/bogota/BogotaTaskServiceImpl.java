package co.libertadores.apigateway.service.impl.bogota;

import co.libertadores.apigateway.api.Task;
import co.libertadores.apigateway.api.request.TaskCreateRequest;
import co.libertadores.apigateway.api.request.TaskUpdateRequest;
import co.libertadores.apigateway.api.response.TaskCreateUpdateResponse;
import co.libertadores.apigateway.service.ITaskService;
import co.libertadores.apigateway.service.IUserService;
import co.libertadores.apigateway.service.exception.MicroserviceException;
import co.libertadores.apigateway.service.exception.UserException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@Qualifier("bogota")
public class BogotaTaskServiceImpl implements ITaskService {

    private final String taskService;

    private final IUserService bogotaUserService;

    private final RestTemplate restTemplate;

    private static final String USER_DOES_NOT_EXISTS = "El usuario no existe";

    public BogotaTaskServiceImpl(@Qualifier("bogota") IUserService bogotaUserService, @Value("${bogota.task.service.url}") String taskService, RestTemplate restTemplate) {
        this.bogotaUserService = bogotaUserService;
        this.taskService = taskService;
        this.restTemplate = restTemplate;
    }

    @Override
    public TaskCreateUpdateResponse save(TaskCreateRequest taskCreateRequest) {
        if (bogotaUserService.existsById(taskCreateRequest.getUserId())) throw new UserException(USER_DOES_NOT_EXISTS);
        try {
            return restTemplate.postForObject(taskService, taskCreateRequest, TaskCreateUpdateResponse.class);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public List<Task> getTasks(Long userId) {
        String url = taskService + "by-user/" + userId;
        try {
            return restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Task>>() {
            }).getBody();
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public Task getTask(Long id) {
        String url = taskService + id;
        try {
            return restTemplate.getForObject(url, Task.class);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public TaskCreateUpdateResponse update(Long id, TaskUpdateRequest taskUpdateRequest) {
        String url = taskService + id;

        if (bogotaUserService.existsById(taskUpdateRequest.getUserId())) throw new UserException(USER_DOES_NOT_EXISTS);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<TaskUpdateRequest> request = new HttpEntity<>(taskUpdateRequest, headers);
        try {
            return restTemplate.exchange(url, HttpMethod.PUT, request, TaskCreateUpdateResponse.class).getBody();
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public void delete(Long id) {
        String url = taskService + id;
        try {
            restTemplate.delete(url);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public void deleteByUserId(Long userId) {
        String url = taskService + "by-user/" + userId;
        try {
            restTemplate.delete(url);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }

    }
}
