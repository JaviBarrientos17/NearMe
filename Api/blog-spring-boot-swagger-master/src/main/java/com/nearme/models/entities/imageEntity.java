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
@Table(name = "nm_images")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class imageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_image")
    private Integer idImages;
    @Column(name = "id_reference")
    private Integer id_reference;
    @Column(name = "table_reference")
    private Integer table_reference;
    @NotBlank(message = "A image must have a type")
    private String type;
    private String name;
    private String path;
}
