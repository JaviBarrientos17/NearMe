package com.nearme.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {

    private Integer idCategory;
    private String name;
    private boolean root;
    private Integer parent;
    private String imgUrl;
}