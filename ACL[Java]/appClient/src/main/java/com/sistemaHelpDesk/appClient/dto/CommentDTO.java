package com.sistemaHelpDesk.appClient.dto;

import java.util.Date;

public class CommentDTO {
    private int id;
    private String description;
    private Date commentTime;
    private int issueByReportNumber;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCommentTime() {
        return commentTime;
    }

    public void setCommentTime(Date commentTime) {
        this.commentTime = commentTime;
    }

    public int getIssueByReportNumber() {
        return issueByReportNumber;
    }

    public void setIssueByReportNumber(int issueByReportNumber) {
        this.issueByReportNumber = issueByReportNumber;
    }
}
