package br.com.mecanopecas.mecanopecas.persistence;

import br.com.mecanopecas.mecanopecas.model.Vendedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VendedorRepository extends JpaRepository<Vendedor, Long>
{
    @Query("SELECT COUNT(v) > 0 FROM Vendedor v WHERE v.cpf = :cpf")
    boolean existsByCpf(@Param("cpf") String cpf);

    @Query("SELECT COUNT(v) > 0 FROM Vendedor v WHERE v.emailInstitucional = :emailInstitucional")
    boolean existsByEmailInstitucional(@Param("emailInstitucional") String emailInstitucional);

    Optional<Vendedor> findByEmailInstitucional(String emailInstitucional);
}
