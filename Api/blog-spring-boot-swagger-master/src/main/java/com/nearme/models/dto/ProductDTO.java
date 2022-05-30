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
    Integer subCategory;
    Integer stock;
    Double price;
    @Size(min = 0, max = 250)
    String reference;
    boolean active;
    @Size(min = 0, max = 250)
    String dateAdded;
    @Size(min = 0, max = 500)
    String imgUrl;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        ProductDTO that = (ProductDTO) o;
        if (that.getIdProduct() == getIdProduct()) {
            return true;
        }
        return idProduct.equals(that.idProduct);
    }

    @Override
    public String toString() {
        return "ProductDTO [idProduct=" + idProduct + ", idSupplier=" + idSupplier + ", name=" + name + ", description="
                + description + ", category=" + category + ", subcategory=" + subCategory + ", stock=" + stock
                + ", Price=" + price + ", reference=" + reference + ", active=" + active + ", dateAdded=" + dateAdded
                + ", imgUrl=" + imgUrl + "]";
    }
}
