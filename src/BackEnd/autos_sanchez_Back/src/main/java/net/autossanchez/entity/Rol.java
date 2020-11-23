package net.autossanchez.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Data;
import net.autossanchez.enums.RolName;

@Entity
@Data
public class Rol {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull
    @Enumerated(EnumType.STRING)
    private RolName rolName;

    public Rol() {
    }

    public Rol(@NotNull RolName rolName) {
        this.rolName = rolName;
    }
}
