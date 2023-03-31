package co.libertadores.taskservice.repository;

import co.libertadores.taskservice.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserId(Long userId);

    void deleteByUserId(Long userId);
}
