package co.libertadores.apigateway.service.exception;

import co.libertadores.apigateway.api.ExceptionMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionTranslator {

    private static final Logger logger = LoggerFactory.getLogger(ExceptionTranslator.class);
    private static final String ERROR = "ERROR";

    private static final String URL_USER = "/api/v1/bogota/";

    @ExceptionHandler(UserException.class)
    public ResponseEntity<BadRequestMessage> handleUserException(UserException ex) {
        BadRequestMessage error = new BadRequestMessage(ERROR, ex.getMessage(), HttpStatus.BAD_REQUEST, ZonedDateTime.now(), URL_USER);
        logger.warn("{}", error);
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MicroserviceException.class)
    public ResponseEntity<ExceptionMessage> handleMicroserviceException(MicroserviceException ex) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(ex.getMessage());
        String title = jsonNode.get("title").asText();
        String message = jsonNode.get("message").asText();
        String status = jsonNode.get("status").asText();
        String time = jsonNode.get("time").asText();
        String url = jsonNode.get("url").asText();
        ExceptionMessage error = new ExceptionMessage(title,message, status, time, url);
        logger.warn("{}", error);

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String field = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(field, message);
        });
        logger.warn("{}", errors);
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

}
