package co.libertadores.apigateway.service.exception;

public class MicroserviceException extends RuntimeException {
    public MicroserviceException(String exception) {
        super(exception);
    }
}
