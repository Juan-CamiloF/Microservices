package co.libertadores.stateservice.service.impl;

import co.libertadores.stateservice.entity.State;
import co.libertadores.stateservice.repository.IStateRepository;
import co.libertadores.stateservice.service.IStateService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StateServiceImpl implements IStateService {

    private final IStateRepository stateRepository;

    public StateServiceImpl(IStateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    @Override
    @Transactional
    public List<State> findAll() {
        return stateRepository.findAll();
    }
}
