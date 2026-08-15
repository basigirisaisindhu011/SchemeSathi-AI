package com.schemesathi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "states")
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 100, nullable = false, unique = true)
    private String name;

    public State() {}

    public State(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static StateBuilder builder() {
        return new StateBuilder();
    }

    public static class StateBuilder {
        private Integer id;
        private String name;

        public StateBuilder id(Integer id) {
            this.id = id;
            return this;
        }

        public StateBuilder name(String name) {
            this.name = name;
            return this;
        }

        public State build() {
            return new State(id, name);
        }
    }
}
