package co.libertadores.apigateway.api.response;

import co.libertadores.apigateway.api.Task;

public class TaskCreateUpdateResponse {

    String message;
    Task task;

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
                '}';
    }
}
