package co.libertadores.userservice.service.impl;

import co.libertadores.userservice.api.Task;
import co.libertadores.userservice.api.request.TaskCreateRequest;
import co.libertadores.userservice.api.request.TaskUpdateRequest;
import co.libertadores.userservice.api.response.TaskCreateUpdateResponse;
import co.libertadores.userservice.service.ITaskService;
import co.libertadores.userservice.service.IUserService;
import co.libertadores.userservice.service.exception.MicroserviceException;
import co.libertadores.userservice.service.exception.UserException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class TaskServiceImpl implements ITaskService {

    private final String serviceTask;

    private final IUserService userService;

    private final RestTemplate restTemplate;

    private static final String USER_DOES_NOT_EXISTS = "El usuario no existe";

    public TaskServiceImpl(IUserService userService, @Value("${task.service.url}") String serviceTask, RestTemplate restTemplate) {
        this.userService = userService;
        this.serviceTask = serviceTask;
        this.restTemplate = restTemplate;
    }

    @Override
    public TaskCreateUpdateResponse save(TaskCreateRequest taskCreateRequest) {
        if (userService.existsById(taskCreateRequest.getUserId())) throw new UserException(USER_DOES_NOT_EXISTS);
        try {
            return restTemplate.postForObject(serviceTask, taskCreateRequest, TaskCreateUpdateResponse.class);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public List<Task> getTasks(Long userId) {
        String url = serviceTask + "by-user/" + userId;
        try {
            return restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Task>>() {
            }).getBody();
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public Task getTask(Long id) {
        String url = serviceTask + id;
        try {
            return restTemplate.getForObject(url, Task.class);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public TaskCreateUpdateResponse update(Long id, TaskUpdateRequest taskUpdateRequest) {
        String url = serviceTask + id;

        if (userService.existsById(taskUpdateRequest.getUserId())) throw new UserException(USER_DOES_NOT_EXISTS);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<TaskUpdateRequest> request = new HttpEntity<>(taskUpdateRequest, headers);
        return restTemplate.exchange(url, HttpMethod.PUT, request, TaskCreateUpdateResponse.class).getBody();
    }

    @Override
    public void delete(Long id) {
        String url = serviceTask + id;
        try {
            restTemplate.delete(url);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public void deleteByUserId(Long userId) {
        String url = serviceTask + "by-user/" + userId;
        try {
            restTemplate.delete(url);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }

    }
}
