package lk.priyanthasupermarket;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // convert into persistence entity
@Table(name = "designation") // to map with designation db table

@Data // to generate getters and setters toString ... etc functions
@NoArgsConstructor // default constructor
@AllArgsConstructor // all arguments constructor
public class Designation {
    
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment

    @Column(name = "id", unique = true)
    private Integer id; 
    
    @Column(name = "name")
    private String name;
}
