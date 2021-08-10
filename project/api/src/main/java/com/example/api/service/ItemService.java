package com.example.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.api.repository.ItemRepository;
import com.example.api.model.Item;
import com.example.api.model.payload.ItemRequest;
import com.example.api.model.payload.ItemResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public ItemResponse createItem(String itemValue) {
        Item item = new Item();
        item.setItemValue(itemValue);
        Item created = itemRepository.save(item);

        ItemResponse response = new ItemResponse();
        response.setItemId(created.getId());
        response.setItemValue(created.getItemValue());
        return response;
    }

    public ItemResponse getItem(Long itemId) {
        ItemResponse response = new ItemResponse();
        Optional<Item> item = itemRepository.findById(itemId);
        if (item.isPresent()) {
            response.setItemId(item.get().getId());
            response.setItemValue(item.get().getItemValue());
        }
        return response;
    }

}