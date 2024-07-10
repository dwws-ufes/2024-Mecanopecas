package br.com.mecanopecas.mecanopecas.servlets;

import br.com.mecanopecas.mecanopecas.model.Peca;
import br.com.mecanopecas.mecanopecas.persistence.PecaRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.jena.rdf.model.*;
import org.apache.jena.vocabulary.RDF;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(urlPatterns = {"/mecanopecas/data/pecas"})
public class ListPecasRdfServlet extends HttpServlet {

    private PecaRepository pecaRepository;
    public ListPecasRdfServlet(PecaRepository pecaRepository) {
        this.pecaRepository = pecaRepository;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/xml");
        List<Peca> pecas = pecaRepository.findAll();

        Model model = ModelFactory.createDefaultModel();
        String myNs = "http://localhost:8081/mecanopecas/data/pecas";
        String grNs = "http://purl.org/goodrelations/v1#";

        // Classes do vocabulário
        Resource grProductOrService = ResourceFactory.createResource(grNs + "ProductOrService");
        Resource grUnitPriceSpecification = ResourceFactory.createResource(grNs + "UnitPriceSpecification");

        // Propriedades (predicados) do vocabulário
        Property grName = ResourceFactory.createProperty(grNs + "name");
        Property grDescription = ResourceFactory.createProperty(grNs + "description");
        Property grHasPriceSpecification = ResourceFactory.createProperty(grNs + "hasPriceSpecification");
        Property grHasCurrencyValue = ResourceFactory.createProperty(grNs + "hasCurrencyValue");
        Property grHasCurrency = ResourceFactory.createProperty(grNs + "hasCurrency");
        Property grInventoryLevel = ResourceFactory.createProperty(grNs + "inventoryLevel");
        Property grCondition = ResourceFactory.createProperty(grNs + "condition");
        Property grBrand = ResourceFactory.createProperty(grNs + "brand");
        Property grModel = ResourceFactory.createProperty(grNs + "model");

        // Produzir o modelo em memória
        for (Peca peca : pecas) {
            model.createResource(myNs + "Peca_" + removeSpace(peca.getNome()))
                    .addProperty(RDF.type, grProductOrService)
                    .addProperty(grName, removeSpace(peca.getNome()))
                    .addProperty(grDescription, "Modelo: " + removeSpace(peca.getModelo()) + ", Marca: " + removeSpace(peca.getMarca()))
                    .addLiteral(grInventoryLevel, peca.getQtdEstoque())
                    .addLiteral(grCondition, peca.isAtivo())
                    .addProperty(grBrand, removeSpace(peca.getMarca()))
                    .addProperty(grModel, removeSpace(peca.getModelo()))
                    .addProperty(grHasPriceSpecification, model.createResource()
                            .addProperty(RDF.type, grUnitPriceSpecification)
                            .addLiteral(grHasCurrencyValue, peca.getPreco())
                            .addProperty(grHasCurrency, "BRL"));
        }

        try (PrintWriter out = resp.getWriter()) {
            model.write(out, "RDF/XML");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("OLHA O ERRO AQUI: " + e);
        }
    }

    private String removeSpace(String value){
        if (value != null)
            return value.replace(" ", "_");
        else
            return "Unknown";
    }
}
