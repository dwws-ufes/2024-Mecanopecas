package br.com.mecanopecas.mecanopecas.configuration;

import br.com.mecanopecas.mecanopecas.model.Admin;
import br.com.mecanopecas.mecanopecas.persistence.AdminRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminConfig implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminConfig(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @Override
    public void run(String... args) throws Exception {

        // var basicAdmin = adminRepository.findByNome("admin");
        // basicAdmin.ifPresentOrElse(
        //         admin -> {
        //             System.out.println("Admin: " + admin.getNome() + " já existente");
        //         },
        //         () -> {
        //             Admin admin = new Admin();
        //             admin.setNome("Admin");
        //             admin.setCpf("12345678999");
        //             admin.setEmailPessoal("admin@gmail.com");
        //             admin.setTelefone("027999258452");
        //             admin.setEmailInstitucional("admin@mecanopecas.com");
        //             admin.setPassword(passwordEncoder.encode("admin"));
        //             adminRepository.save(admin);
        //         }
        // );
    }
}
