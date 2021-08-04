package com.example.demo.Service;

import com.example.demo.TodoDao;
import com.example.demo.entity.Todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {
  @Autowired
  TodoDao todoDao;

  public Iterable<Todo> getTodos () {
    return todoDao.findAll();
  }
}
