package co.libertadores.userservice.controller.response;

import co.libertadores.userservice.entity.User;

public class UserCreateUpdateResponse {

    private String message;

    private User user;

    public UserCreateUpdateResponse(String message, User user){
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

    @Override
    public String toString() {
        return "{" +
                "message='" + message + '\'' +
                ", user=" + user +
                '}';
    }
}
