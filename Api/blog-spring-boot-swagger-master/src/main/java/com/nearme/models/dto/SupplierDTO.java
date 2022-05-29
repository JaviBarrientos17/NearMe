package com.nearme.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SupplierDTO {
    private Integer idSupplier;
    private Integer idUser;
    private String geo;
    private String description;
    private String imageUrl;

}
