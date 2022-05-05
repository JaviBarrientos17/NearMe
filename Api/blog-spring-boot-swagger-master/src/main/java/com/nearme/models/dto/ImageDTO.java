package com.nearme.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageDTO {
    private Integer idImages;
    private Integer id_reference;
    private Integer table_reference;
    private String type;
    private String name;
    private String path;

}
