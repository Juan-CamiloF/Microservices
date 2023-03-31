package co.libertadores.userservice.api;


public class ExceptionMessage {

    private final String title;
    private final String message;
    private final String status;
    private final String time;
    private final String url;

    public ExceptionMessage(String title, String message, String status, String time, String url) {
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

    public String getStatus() {
        return status;
    }

    public String getTime() {
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
                ", status='" + status + '\'' +
                ", time='" + time + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
