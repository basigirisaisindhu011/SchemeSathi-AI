package com.schemesathi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "districts", uniqueConstraints = {@UniqueConstraint(columnNames = {"name", "state_id"})})
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 100, nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "state_id", nullable = false)
    private State state;

    public District() {}

    public District(Integer id, String name, State state) {
        this.id = id;
        this.name = name;
        this.state = state;
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

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public static DistrictBuilder builder() {
        return new DistrictBuilder();
    }

    public static class DistrictBuilder {
        private Integer id;
        private String name;
        private State state;

        public DistrictBuilder id(Integer id) {
            this.id = id;
            return this;
        }

        public DistrictBuilder name(String name) {
            this.name = name;
            return this;
        }

        public DistrictBuilder state(State state) {
            this.state = state;
            return this;
        }

        public District build() {
            return new District(id, name, state);
        }
    }
}
