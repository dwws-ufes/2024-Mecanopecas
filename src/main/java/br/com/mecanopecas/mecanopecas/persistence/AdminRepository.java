package br.com.mecanopecas.mecanopecas.persistence;

import br.com.mecanopecas.mecanopecas.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByEmailInstitucional(String emailInstitucional);

    Optional<Admin> findByEmailPessoal(String emailPessoal);
}
