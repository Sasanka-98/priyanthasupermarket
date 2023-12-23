package lk.priyanthasupermarket;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "privilege")

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Privilege {
    
    @Id // PK
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AI
    @Column(name = "id")
    private Integer id; 
    
    @Column(name = "privi_sel")
    @NotNull
    private Boolean privi_sel;
    
    @Column(name = "privi_inst")
    @NotNull
    private Boolean privi_inst; 
    
    @Column(name = "privi_upd")
    @NotNull
    private Boolean privi_upd; 
    
    @Column(name = "privi_del")
    @NotNull
    private Boolean privi_del; 
    
    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role_id; 
    
    @ManyToOne
    @JoinColumn(name = "module_id", referencedColumnName = "id")
    private Module module_id;
}
