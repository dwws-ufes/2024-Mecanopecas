package br.com.mecanopecas.mecanopecas.persistence;

import br.com.mecanopecas.mecanopecas.model.Vendedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VendedorRepository extends JpaRepository<Vendedor, Long> {
    Optional<Vendedor> findByEmailInstitucional(String emailInstitucional);
}
