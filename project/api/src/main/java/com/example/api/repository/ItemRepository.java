package com.example.api.repository;

import com.example.api.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface ItemRepository extends JpaRepository<Item, Long> {

}