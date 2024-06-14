package br.com.mecanopecas.mecanopecas.persistence;

import br.com.mecanopecas.mecanopecas.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    @Query("SELECT COUNT(c) > 0 FROM Cliente c WHERE c.cpfCnpj = :cpfCnpj")
    boolean existsByCpfCnpj(@Param("cpfCnpj") String cpfCnpj);
}
