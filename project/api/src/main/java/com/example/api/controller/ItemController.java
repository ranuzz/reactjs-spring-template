package com.example.api.controller;

import java.util.List;

import com.example.api.service.ItemService;
import com.example.api.model.payload.ItemRequest;
import com.example.api.model.payload.ItemResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping("create/{itemValue}")
    public ItemResponse createItem(@PathVariable String itemValue) {
        return itemService.createItem(itemValue);
    }

    @GetMapping("{itemid}")
    public ItemResponse getItem(@PathVariable long itemid) {
        return itemService.getItem(itemid);
    }

}