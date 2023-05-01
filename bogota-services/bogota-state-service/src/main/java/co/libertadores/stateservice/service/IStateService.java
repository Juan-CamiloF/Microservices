package co.libertadores.stateservice.service;

import co.libertadores.stateservice.entity.State;

import java.util.List;

public interface IStateService {

    List<State> findAll();
}
