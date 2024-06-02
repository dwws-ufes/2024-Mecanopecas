package br.com.mecanopecas.mecanopecas.persistence;

import br.com.mecanopecas.mecanopecas.model.Gerente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GerenteRepository extends JpaRepository<Gerente, Long>
{
    @Query("SELECT COUNT(g) > 0 FROM Gerente g WHERE g.vendedor.id = :vendedorId")
    boolean existsByVendedorId(@Param("vendedorId") Long vendedorId);
}
