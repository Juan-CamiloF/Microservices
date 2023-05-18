package co.libertadores.taskservice.service.impl;

import co.libertadores.taskservice.controller.request.TaskCreateRequest;
import co.libertadores.taskservice.controller.request.TaskUpdateRequest;
import co.libertadores.taskservice.entity.Task;
import co.libertadores.taskservice.repository.ITaskRepository;
import co.libertadores.taskservice.service.ITaskService;
import co.libertadores.taskservice.service.exception.TaskException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TaskServiceImpl implements ITaskService {

    private final ITaskRepository taskRepository;
    private final ModelMapper modelMapper;
    private static final String TASK_DOES_NOT_EXISTS = "La tarea no existe";

    private static final String INVALID_TASK = "La tarea no es válida";

    public TaskServiceImpl(ITaskRepository taskRepository, ModelMapper modelMapper) {
        this.taskRepository = taskRepository;
        this.modelMapper = modelMapper;

    }

    @Override
    @Transactional
    public Task save(TaskCreateRequest taskCreateRequest) {
        Task newTask = taskCreateConvertToEntity(taskCreateRequest);
        return taskRepository.save(newTask);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Task> findAllByUserId(Long userId, int pageNumber, int pageSize) {
        return taskRepository.findByUserId(userId, PageRequest.of(pageNumber, pageSize));
    }

    @Override
    @Transactional(readOnly = true)
    public Task findById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new TaskException(TASK_DOES_NOT_EXISTS));
    }

    @Override
    @Transactional
    public Task update(Long id, TaskUpdateRequest taskUpdateRequest) {
        if (!id.equals(taskUpdateRequest.getId())) throw new TaskException(INVALID_TASK);
        Task task = taskUpdateConvertToEntity(taskUpdateRequest);
        return taskRepository.save(task);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new TaskException(TASK_DOES_NOT_EXISTS));
        taskRepository.delete(task);
    }

    @Override
    @Transactional
    public void deleteAllByUser(Long id) {
        taskRepository.deleteByUserId(id);
    }

    public Task taskCreateConvertToEntity(TaskCreateRequest taskCreateRequest) {
        return modelMapper.map(taskCreateRequest, Task.class);
    }

    public Task taskUpdateConvertToEntity(TaskUpdateRequest taskUpdateRequest) {
        return modelMapper.map(taskUpdateRequest, Task.class);
    }

}
