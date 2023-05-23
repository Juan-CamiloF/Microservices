package co.libertadores.apigateway.controller.response;

public class ResponseAuthUser {

    private String jwt;

    public ResponseAuthUser(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}
