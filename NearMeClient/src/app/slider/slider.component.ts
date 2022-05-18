import { Component } from "@angular/core";

@Component({
    selector: "slider-component",
    templateUrl: "./slider.component.html",
    styleUrls: ["./slider.component.css"]
})

export class SliderComponent {
    images:Array<any> = [
        {"url":"https://cdn.amazcat.cat/users/11fa30f06fa995ae7c8f10c1e02f032ce25e2a92ce8bb06ee9a5085f68cc6ccb5ad06843fc7f07979a1fbaa75651ef0b3eeda142a95c9505f044179e410bd1e9/images/products/0e428c2e28cab06f1f3dd84134c6d2f00cafaeea7b3e43d1cda877500c0191511626193627_thump.jpg"},
        {"url":"https://cdn.amazcat.cat/users/11fa30f06fa995ae7c8f10c1e02f032ce25e2a92ce8bb06ee9a5085f68cc6ccb5ad06843fc7f07979a1fbaa75651ef0b3eeda142a95c9505f044179e410bd1e9/images/products/7c20085c69e7bce4078ed255851948940ad671ef3473c5182eb58db1efaef1b71626192497_thump.jpg"},
        {"url":"https://cdn.amazcat.cat/users/11fa30f06fa995ae7c8f10c1e02f032ce25e2a92ce8bb06ee9a5085f68cc6ccb5ad06843fc7f07979a1fbaa75651ef0b3eeda142a95c9505f044179e410bd1e9/images/products/549bfd8ae9e19ef220cd11b025a66a5201b7f1dffe29119dc7df5e28d196461b1626203918_thump.jpg"},
        {"url":"https://cdn.amazcat.cat/users/11fa30f06fa995ae7c8f10c1e02f032ce25e2a92ce8bb06ee9a5085f68cc6ccb5ad06843fc7f07979a1fbaa75651ef0b3eeda142a95c9505f044179e410bd1e9/images/products/b0f61fe565f311af682d25520cd4824d34dfad003f3e8ce02b3ced16b74c999e1626199980_thump.jpg"},
    ];
}