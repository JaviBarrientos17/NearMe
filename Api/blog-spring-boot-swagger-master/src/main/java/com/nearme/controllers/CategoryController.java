package com.nearme.controllers;

import com.nearme.services.CategoryServices;
import com.nearme.services.ProductService;
import javax.validation.Valid;

import java.io.IOException;
import java.util.List;

import com.nearme.models.dto.CategoryDTO;
import com.nearme.models.dto.ErrorDTO;
import com.nearme.models.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryServices categoryService;

    /**
     * \
     * Lists all existing MainCategories
     *
     * @return
     * @throws Exception
     */
    @GetMapping("/listMain")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<CategoryDTO>> getMainCategoryList() throws Exception {
        log.info("Listing all MainCategories");
        return new ResponseEntity<List<CategoryDTO>>(this.categoryService.getMainCategories(), HttpStatus.OK);
    }

    /**
     * List SubCategories
     *
     * @return
     * @throws Exception
     */
    @GetMapping("/ListSub")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<CategoryDTO>> getSubCategoryList() throws Exception {
        log.info("Listing all SubCategories");
        return new ResponseEntity<List<CategoryDTO>>(this.categoryService.getSubCategories(), HttpStatus.OK);
    }




}
