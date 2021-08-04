package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.entity.Todo;

public interface TodoDao extends CrudRepository<Todo, Integer> {
  
}
