package com.teleatlantico.www.controller;

import com.teleatlantico.www.converter.IssueConverter;
import com.teleatlantico.www.domain.Issue;
import com.teleatlantico.www.dto.IssueDTO;
import com.teleatlantico.www.dto.apiSupportApp.IssueSupportDTO;
import com.teleatlantico.www.dto.apiSupportApp.UpdateIntStringDTO;
import com.teleatlantico.www.exceptions.UnidentifiedException;
import com.teleatlantico.www.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/issue")
public class IssueController {
    @Autowired
    private IssueService service;
    @Autowired
    private IssueConverter converter;
    @Autowired
    private RestTemplate template;
    private String _url = "http://localhost:50044/api/Issue/";

    @RequestMapping(path = "/", method = RequestMethod.POST)
    public IssueDTO save(@RequestBody IssueDTO dto) {
        dto.setSupportUserAssigned("No asignado");
        IssueDTO newIssue = null;
        try{
            dto.setStatus("Ingresado");
            dto.setRegisterTime(new Date());
            newIssue = converter.toDTO(service.save(converter.toEntity(dto)));
            IssueSupportDTO issueSupportDTO = new IssueSupportDTO();
            issueSupportDTO.setReport_Number(newIssue.getReportNumber());
            ResponseEntity<IssueSupportDTO> response =
                    template.postForEntity(this._url, issueSupportDTO, IssueSupportDTO.class);
        } catch (Exception ex) {
            if(newIssue != null) this.service.delete(newIssue.getReportNumber());
            throw new UnidentifiedException();
        }
        return newIssue;
    }

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public List<IssueDTO> findAll() {
        return service.findAll().stream().map(it -> converter.toDTO(it))
                .collect(Collectors.toList());
    }

    @RequestMapping(path = "/findAllByUserId/{id}", method = RequestMethod.GET)
    public List<IssueDTO> findAllByUserId(@PathVariable("id") int userId) {
        return service.findAllByUserId(userId).stream().map(it -> converter.toDTO(it))
                .collect(Collectors.toList());
    }

    @RequestMapping(path = "/{reportNumber}", method = RequestMethod.GET)
    public IssueDTO findById(@PathVariable("reportNumber") int reportNumber) {
        return converter.toDTO(service.findById(reportNumber));
    }

    @RequestMapping(path = "/{reportNumber}", method = RequestMethod.PUT)
    public IssueDTO update(@PathVariable("reportNumber") int reportNumber,
                           @RequestBody IssueDTO dto) {
        Issue entity = converter.toEntity(dto);
        entity.setReportNumber(reportNumber);
        return converter.toDTO(service.update(entity));
    }

    @RequestMapping(path = "/updateStatus", method = RequestMethod.PUT)
    public void updateStatus(@RequestBody UpdateIntStringDTO dto) {
        this.service.updateStatus(dto.getReportNumber(), dto.getVal());
    }

    @RequestMapping(path = "/updateSupporterAssigned", method = RequestMethod.PUT)
    public void updateSupporterAssigned(@RequestBody UpdateIntStringDTO dto) {
        this.service.updateSupporterAssigned(dto.getReportNumber(), dto.getVal());
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") int id) {
        service.delete(id);
    }
}
