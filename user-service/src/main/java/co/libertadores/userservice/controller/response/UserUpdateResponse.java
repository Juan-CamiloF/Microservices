package co.libertadores.userservice.controller.response;

import co.libertadores.userservice.entity.User;

public class UserUpdateResponse {

    private String message;

    private User user;

    public UserUpdateResponse(String message, User user) {
        this.message = message;
        this.user = user;
    }

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
}
