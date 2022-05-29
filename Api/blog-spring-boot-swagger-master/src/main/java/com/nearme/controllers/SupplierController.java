package com.nearme.controllers;

import java.util.List;
import com.nearme.models.dto.SupplierDTO;
import com.nearme.services.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    /**
     * Annds a new supplier
     * 
     * @param SupplierDTO
     * @return response
     * @throws Exception
     * 
     */
    @PostMapping("/add-supplier")
    @ResponseStatus(HttpStatus.OK)
    @Operation(security = @SecurityRequirement(name = "JwtToken"))
    public ResponseEntity<SupplierDTO> addSupplier(@RequestBody SupplierDTO supplierDTO) throws Exception {
        return new ResponseEntity<SupplierDTO>(this.supplierService.addSupplier(supplierDTO), HttpStatus.OK);
    }

    /**
     * Lists all existing suppliers
     * 
     * @return
     * @throws Exception
     */
    @Operation(security = @SecurityRequirement(name = "JwtToken"))
    @GetMapping("/list")
    public ResponseEntity<List<SupplierDTO>> getSuppliersList() throws Exception {
        log.info("Listing all suppliers");
        return new ResponseEntity<List<SupplierDTO>>(this.supplierService.getSuppliers(), HttpStatus.OK);
    }

    /**
     * Get supplie by id
     * *
     * 
     * @param SupplierDTO
     * @return response
     * @throws Exception
     * 
     */
    @GetMapping("/id/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    @Operation(security = @SecurityRequirement(name = "JwtToken"))
    public ResponseEntity<SupplierDTO> getSupplierByIdUser(@PathVariable Integer idUser) throws Exception {
        return new ResponseEntity<SupplierDTO>(this.supplierService.getSupplierByIdUser(idUser), HttpStatus.OK);
    }

}
