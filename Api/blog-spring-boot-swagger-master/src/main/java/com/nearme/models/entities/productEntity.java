package com.nearme.models.entities;


import static java.util.stream.Collectors.toList;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.apache.logging.log4j.message.TimestampMessage;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.nearme.models.types.UserStatusType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
@Entity
@Table(name = "nm_product")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
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
    private Integer Price;
    private String reference;
    @Builder.Default
    private boolean active = true;
    private String dateAdded;
    @Column(name="img_url")
     private String imgUrl;        
    


}
