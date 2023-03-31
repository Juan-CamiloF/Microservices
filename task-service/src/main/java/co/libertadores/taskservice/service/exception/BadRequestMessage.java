package co.libertadores.taskservice.service.exception;

import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

public class BadRequestMessage {
    private final String title;
    private final String message;
    private final HttpStatus status;
    private final ZonedDateTime time;
    private final String url;

    public BadRequestMessage(String title, String message, HttpStatus status, ZonedDateTime time, String url) {
        this.title = title;
        this.message = message;
        this.status = status;
        this.time = time;
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public String getUrl() {
        return url;
    }

    @Override
    public String toString() {
        return "{" +
                "title='" + title + '\'' +
                ", message='" + message + '\'' +
                ", status=" + status +
                ", time=" + time +
                ", url='" + url + '\'' +
                '}';
    }
}
