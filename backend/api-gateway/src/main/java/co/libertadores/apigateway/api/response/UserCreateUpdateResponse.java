package co.libertadores.apigateway.api.response;

import co.libertadores.apigateway.api.User;

public class UserCreateUpdateResponse {

    private String message;

    private User user;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "{" +
                "message='" + message + '\'' +
                ", user=" + user +
                '}';
    }
}
