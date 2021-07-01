package com.teleatlantico.www.domain;

import java.util.Date;

public class Comment {

    private int commentId;
    private int userId;
    private String description;
    private Date commentTimestamp;

    public Comment(){

    }

    public Comment(int commentId, int userId, String description, Date commentTimestamp) {
        this.setCommentId(commentId);
        this.setUserId(userId);
        this.setDescription(description);
        this.setCommentTimestamp(commentTimestamp);
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCommentTimestamp() {
        return commentTimestamp;
    }

    public void setCommentTimestamp(Date commentTimestamp) {
        this.commentTimestamp = commentTimestamp;
    }
}
