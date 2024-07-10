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
    public List<String> constultaMarcas(String marca){
        List<String> partList = new ArrayList<>();
        if (marca.length() >= 3){
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
                    "  FILTER (regex(?manufacturerLabel, \""+ marca + "\", \"i\"))" +
                    "}\n" +
                    "LIMIT 100\n";
            try {
                QueryExecution queryExecution = QueryExecution.service(SPARQL_URL).query(query).build();
                ResultSet resultSet = queryExecution.execSelect();
                while(resultSet.hasNext()){
                    QuerySolution querySolution = resultSet.next();
                    String literal = querySolution.getLiteral("manufacturerLabel").getString();
                    partList.add(literal);
                }
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
        return partList;
    }
}