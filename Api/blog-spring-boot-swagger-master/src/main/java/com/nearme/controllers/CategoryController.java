package com.nearme.controllers;

import com.nearme.services.CategoryServices;

import java.util.List;

import com.nearme.models.dto.CategoryDTO;
import com.nearme.models.entities.CategoryEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
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
    public ResponseEntity<List<CategoryEntity>> getMainCategoryList() throws Exception {
        log.info("Listing all MainCategories");
        return new ResponseEntity<List<CategoryEntity>>(this.categoryService.getMainCategories(), HttpStatus.OK);
    }

    /**
     * List SubCategories
     *
     * @return
     * @throws Exception
     */
    @GetMapping("/ListSub")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<CategoryEntity>> getSubCategoryList() throws Exception {
        log.info("Listing all SubCategories");
        return new ResponseEntity<List<CategoryEntity>>(this.categoryService.getSubCategories(), HttpStatus.OK);
    }

    /**
     * List All Existing Categories
     *
     * @return
     * @throws Exception
     */
    @GetMapping("/list")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<CategoryEntity>> getCategoryList() throws Exception {
        log.info("Listing all categories");
        return new ResponseEntity<List<CategoryEntity>>(this.categoryService.getAllCategories(), HttpStatus.OK);

    }
}