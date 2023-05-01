package co.libertadores.apigateway.service.impl.medellin;

import co.libertadores.apigateway.api.State;
import co.libertadores.apigateway.service.IStateService;
import co.libertadores.apigateway.service.exception.MicroserviceException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@Qualifier("medellin")
public class MedellinStateServiceImpl implements IStateService {

    private final String serviceState;

    private final RestTemplate restTemplate;


    public MedellinStateServiceImpl(@Value("${medellin.state.service.url}") String serviceState, RestTemplate restTemplate) {
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
