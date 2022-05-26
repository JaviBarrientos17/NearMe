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
@Table(name = "nm_product")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_product")
    private Integer IdProduct;
    @Column(name = "id_supplier")
    @NotBlank(message = "A product must have a supplier")
    private Integer idSupplier;
    @NotBlank(message = "A product must have a name")
    private String name;
    @NotBlank(message = "A product must have a Description")
    private String description;
    @Column(name = "id_category")
    private Integer category;
    @Column(name = "id_subcategory")
    private Integer subCategory;
    private Integer stock;
    @NotBlank(message = "A product must have a price")
    private Double Price;
    private String reference;
    @Builder.Default
    private boolean active = true;
    private String dateAdded;
    @Column(name = "img_url")
    private String imgUrl;

    // override equals and hashcode
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        ProductEntity that = (ProductEntity) o;
        if (that.getIdProduct() == getIdProduct()) {
            return true;
        }
        return IdProduct.equals(that.IdProduct);
    }

    @Override
    public int hashCode() {
        return IdProduct.hashCode();
    }


    @Override
    public String toString() {
        return "ProductEntity{" +
                "IdProduct=" + IdProduct +
                ", idSupplier=" + idSupplier +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", category=" + category +
                ", subCategory=" + subCategory +
                ", stock=" + stock +
                ", Price=" + Price +
                ", reference='" + reference + '\'' +
                ", active=" + active +
                ", dateAdded='" + dateAdded + '\'' +
                ", imgUrl='" + imgUrl + '\'' +
                '}';
    }
}
