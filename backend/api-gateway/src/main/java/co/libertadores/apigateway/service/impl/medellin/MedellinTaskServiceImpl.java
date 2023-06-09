package co.libertadores.apigateway.service.impl.medellin;

import co.libertadores.apigateway.api.RestPageImpl;
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
import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;


@Service
@Qualifier("medellin")
public class MedellinTaskServiceImpl implements ITaskService {

    private final String taskService;

    private final IUserService medellinUserService;

    private final RestTemplate restTemplate;

    private static final String USER_DOES_NOT_EXISTS = "El usuario no existe";

    public MedellinTaskServiceImpl(@Qualifier("medellin") IUserService medellinUserService, @Value("${medellin.task.service.url}") String taskService, RestTemplate restTemplate) {
        this.medellinUserService = medellinUserService;
        this.taskService = taskService;
        this.restTemplate = restTemplate;
    }

    @Override
    public TaskCreateUpdateResponse save(TaskCreateRequest taskCreateRequest) {
        if (medellinUserService.existsById(taskCreateRequest.getUserId()))
            throw new UserException(USER_DOES_NOT_EXISTS);
        try {
            return restTemplate.postForObject(taskService, taskCreateRequest, TaskCreateUpdateResponse.class);
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }

    @Override
    public Page<Task> getTasks(Long userId, int pageNumber, int pageSize) {
        String url = taskService + "by-user/" + userId;
        try {
            UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url)
                    .queryParam("pageNumber", pageNumber)
                    .queryParam("pageSize", pageSize);
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, null, new ParameterizedTypeReference<RestPageImpl<Task>>() {
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

        if (medellinUserService.existsById(taskUpdateRequest.getUserId()))
            throw new UserException(USER_DOES_NOT_EXISTS);
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
