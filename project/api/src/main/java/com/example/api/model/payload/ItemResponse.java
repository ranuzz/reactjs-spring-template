package com.example.api.model.payload;

import lombok.Getter;
import lombok.Setter;


public class ItemResponse {

    @Getter @Setter private Long itemId;
    @Getter @Setter private String itemValue;

}