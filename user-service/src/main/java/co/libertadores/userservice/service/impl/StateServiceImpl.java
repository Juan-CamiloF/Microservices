package co.libertadores.userservice.service.impl;

import co.libertadores.userservice.api.State;
import co.libertadores.userservice.service.IStateService;
import co.libertadores.userservice.service.exception.MicroserviceException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class StateServiceImpl implements IStateService {

    private final String serviceState;

    private final RestTemplate restTemplate;


    public StateServiceImpl(@Value("${state.service.url}") String serviceState, RestTemplate restTemplate) {
        this.serviceState = serviceState;
        this.restTemplate = restTemplate;
    }

    @Override
    public List<State> getStates() {
        try {
            return restTemplate.exchange(serviceState, HttpMethod.GET, null, new ParameterizedTypeReference<List<State>>() {
            }).getBody();
        } catch (Exception e) {
            throw new MicroserviceException(e.getMessage().substring(7, e.getMessage().length() - 1));
        }
    }
}
