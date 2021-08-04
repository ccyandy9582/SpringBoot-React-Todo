package com.example.demo.Service;

import java.net.URI;
import java.net.URISyntaxException;

import com.example.demo.entity.Todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TodoController {
  @Autowired
  TodoService todoService;
  private final TodoRepository todoRepository;

  public TodoController(TodoRepository todoRepository) {
    this.todoRepository = todoRepository;
  }

  @GetMapping("/todos")
  public Iterable<Todo> getTodoList () {
    return todoService.getTodos();
  }

  @GetMapping("/todos/{id}")
  public Todo getTodo(@PathVariable Long id) {
    return todoRepository.findById(id).orElseThrow(RuntimeException::new);
  }

  @PostMapping("/todo")
  public ResponseEntity createTodo(@RequestBody(required = true) Todo todo) throws URISyntaxException {
    System.out.println(todo);
    Todo savedTodo = todoRepository.save(todo);
    return ResponseEntity.created(new URI("/todos/"+savedTodo.getId())).body(savedTodo);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity updateTodo(@PathVariable("id") Long id, @RequestBody Todo todo) {
    Todo currentTodo = todoRepository.findById(id).orElseThrow(RuntimeException::new);
    System.out.println(todo.getStatus());
    currentTodo.setTask(todo.getTask());
    currentTodo.setStatus((int)todo.getStatus());
    currentTodo = todoRepository.save(todo);

    return ResponseEntity.ok(currentTodo);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity deleteTodo(@PathVariable("id") Long id) {
    todoRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }
}
