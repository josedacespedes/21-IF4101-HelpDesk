package com.teleatlantico.www.dto.apiSupportApp;

import java.util.Date;

public class IssueSupportDTO {
    private int Report_Number;
    private int Id_Supporter;
    private String Classification;
    private String Status;
    private Date Report_Time;
    private String Resolution_Comment;

    public int getReport_Number() {
        return Report_Number;
    }

    public void setReport_Number(int report_Number) {
        Report_Number = report_Number;
    }

    public int getId_Supporter() {
        return Id_Supporter;
    }

    public void setId_Supporter(int id_Supporter) {
        Id_Supporter = id_Supporter;
    }

    public String getClassification() {
        return Classification;
    }

    public void setClassification(String classification) {
        Classification = classification;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public Date getReport_Time() {
        return Report_Time;
    }

    public void setReport_Time(Date report_Time) {
        Report_Time = report_Time;
    }

    public String getResolution_Comment() {
        return Resolution_Comment;
    }

    public void setResolution_Comment(String resolution_Comment) {
        Resolution_Comment = resolution_Comment;
    }
}
