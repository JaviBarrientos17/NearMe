package com.nearme.models.dto;

import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    Integer idProduct;
    Integer idSupplier;
    @Size(min = 0, max = 250)
    private String name;
    @Size(min = 0, max = 10000)
    private String description;
    Integer category;
    Integer subcategory;
    Integer stock;
    Double Price;
    @Size(min = 0, max = 250)
    String reference;
    boolean active;
    @Size(min = 0, max = 250)
    String dateAdded;
    @Size(min = 0, max = 250)
    String imgUrl;
  
}
