package br.com.mecanopecas.mecanopecas.services;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class DbpediaService {

    private static final String SPARQL_URL = "https://dbpedia.org/sparql";

    public List<String> searchMarcas(String marca) {
        List<String> marcaList = new ArrayList<>();
            String query = "PREFIX dbo: <http://dbpedia.org/ontology/>\n" +
                    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                    "\n" +
                    "SELECT DISTINCT ?manufacturerLabel\n" +
                    "WHERE {\n" +
                    "  ?car a dbo:Automobile ;\n" +
                    "       rdfs:label ?carLabel ;\n" +
                    "       dbo:manufacturer ?manufacturer .\n" +
                    "  ?manufacturer rdfs:label ?manufacturerLabel .\n" +
                    "  FILTER (lang(?carLabel) = \"en\")\n" +
                    "  FILTER (lang(?manufacturerLabel) = \"en\")\n" +
                    "  FILTER (regex(?manufacturerLabel, \"" + marca + "\", \"i\"))\n" +
                    "}\n";
            try {
                QueryExecution queryExecution = QueryExecution.service(SPARQL_URL).query(query).build();
                ResultSet resultSet = queryExecution.execSelect();
                while (resultSet.hasNext()) {
                    QuerySolution querySolution = resultSet.next();
                    String literal = querySolution.getLiteral("manufacturerLabel").getString();
                    marcaList.add(literal);
                }
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        return marcaList;
    }

    public List<String> searchModelosByMarca(String marca, String modelo) {
        List<String> modelList = new ArrayList<>();
            String query = "PREFIX dbo: <http://dbpedia.org/ontology/>\n" +
                    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                    "\n" +
                    "SELECT DISTINCT ?carLabel\n" +
                    "WHERE {\n" +
                    "  ?car a dbo:Automobile ;\n" +
                    "       rdfs:label ?carLabel ;\n" +
                    "       dbo:manufacturer ?manufacturer .\n" +
                    "  ?manufacturer rdfs:label ?manufacturerLabel .\n" +
                    "  FILTER (lang(?carLabel) = \"en\")\n" +
                    "  FILTER (lang(?manufacturerLabel) = \"en\")\n" +
                    "  FILTER (regex(?manufacturerLabel, \"" + marca + "\", \"i\"))\n" +
                    "  FILTER (regex(?carLabel, \"" + modelo + "\", \"i\"))\n" +
                    "}\n";
            try {
                QueryExecution queryExecution = QueryExecution.service(SPARQL_URL).query(query).build();
                ResultSet resultSet = queryExecution.execSelect();
                while (resultSet.hasNext()) {
                    QuerySolution querySolution = resultSet.next();
                    String literal = querySolution.getLiteral("carLabel").getString();
                    modelList.add(literal);
                }
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        return modelList;
    }
}