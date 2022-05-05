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
public class ImageDTO {
    Integer id;
    Integer id_reference;
    Integer table_reference;
    @Size(min = 0, max = 250)
    String type;
    @Size(min = 0, max = 250)
    String name;
    @Size(min = 0, max = 250)
    String path;
}
