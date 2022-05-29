package com.nearme.models.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "nm_supplier")
@Data
@NoArgsConstructor
public class SupplierEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_supplier")
    private Integer idSupplier;
    private Integer idUser;
    @NotBlank(message = "A supplier must have a name")
    private String name;
    private String geo;
    private String description;
    private String imageUrl;

    @Override
    public String toString() {
        return "SupplierEntity{" +
                "idSupplier=" + idSupplier +
                ", idUser=" + idUser +
                ", name='" + name + '\'' +
                ", geo='" + geo + '\'' +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }

}
