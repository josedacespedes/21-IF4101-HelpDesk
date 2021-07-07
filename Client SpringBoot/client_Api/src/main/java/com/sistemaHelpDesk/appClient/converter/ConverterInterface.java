package com.sistemaHelpDesk.appClient.converter;

public interface ConverterInterface<Entity, DTO> {
    Entity toEntity(DTO dto);
    DTO toDTO(Entity entity);
}
