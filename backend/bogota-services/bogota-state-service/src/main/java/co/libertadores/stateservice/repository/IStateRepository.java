package co.libertadores.stateservice.repository;

import co.libertadores.stateservice.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface IStateRepository extends JpaRepository<State, String> {
}
