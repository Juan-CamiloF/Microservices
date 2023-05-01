package co.libertadores.userservice.repository;

import co.libertadores.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);
}
