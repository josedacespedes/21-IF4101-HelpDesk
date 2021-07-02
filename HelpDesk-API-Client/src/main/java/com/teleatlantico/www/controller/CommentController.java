package com.teleatlantico.www.controller;

import com.teleatlantico.www.converter.CommentConverter;
import com.teleatlantico.www.domain.Comment;
import com.teleatlantico.www.dto.CommentDTO;
import com.teleatlantico.www.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/comment")
public class CommentController {
    @Autowired
    CommentService service;
    @Autowired
    CommentConverter converter;

    @RequestMapping(path = "/", method = RequestMethod.POST)
    public CommentDTO save(@RequestBody CommentDTO dto) {
        return converter.toDTO(service.save(converter.toEntity(dto)));
    }

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public List<CommentDTO> findAll() {
        return service.findAll().stream().map(it -> converter.toDTO(it))
                .collect(Collectors.toList());
    }

    @RequestMapping(path = "/findAllByIssueReportNumber/{reportNumber}", method = RequestMethod.GET)
    public List<CommentDTO> findAllByIssueReportNumber(@PathVariable("reportNumber") int reportNumber) {
        return service.findAllByIssueReportNumber(reportNumber).stream().map(it -> converter.toDTO(it))
                .collect(Collectors.toList());
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public CommentDTO findById(@PathVariable("id") int id) {
        return converter.toDTO(service.findById(id));
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    public CommentDTO update(@PathVariable("id") int id,
                           @RequestBody CommentDTO dto) {
        Comment entity = converter.toEntity(dto);
        entity.setId(id);
        return converter.toDTO(service.update(entity));
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") int id) {
        service.delete(id);
    }
}
