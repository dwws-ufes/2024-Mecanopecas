package br.com.mecanopecas.mecanopecas.persistence;

import br.com.mecanopecas.mecanopecas.model.Gerente;
import br.com.mecanopecas.mecanopecas.model.Vendedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GerenteRepository extends JpaRepository<Gerente, Long>
{
    @Query("SELECT COUNT(g) > 0 FROM Gerente g WHERE g.vendedor.id = :vendedorId")
    boolean existsByVendedorId(@Param("vendedorId") Long vendedorId);
    Optional<Gerente> findByVendedor(Vendedor vendedor);
}
public interface GerenteRepository extends JpaRepository<Gerente, Long> {
}
