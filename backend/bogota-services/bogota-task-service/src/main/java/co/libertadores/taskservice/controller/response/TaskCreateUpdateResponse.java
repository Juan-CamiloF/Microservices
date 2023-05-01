package co.libertadores.taskservice.controller.response;

import co.libertadores.taskservice.entity.Task;

public class TaskCreateUpdateResponse {

    private String message;

    private Task task;

    public TaskCreateUpdateResponse(String message, Task task) {
        this.message = message;
        this.task = task;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    @Override
    public String toString() {
        return "{" +
                "message='" + message + '\'' +
                ", task=" + task +
                "}";
    }
}
