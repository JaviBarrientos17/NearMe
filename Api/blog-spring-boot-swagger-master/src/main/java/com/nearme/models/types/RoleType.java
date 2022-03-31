package com.nearme.models.types;

public enum RoleType {
    ROLE_CLIENT("CLIENT"),
    ROLE_ADMIN("ADMIN"),
    ROLE_SUP("SUPPLIER");

    public final String value;
    private RoleType(String value) {
        this.value = value;
    }
}