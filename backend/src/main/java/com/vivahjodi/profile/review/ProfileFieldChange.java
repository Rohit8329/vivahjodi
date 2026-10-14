package com.vivahjodi.profile.review;

public class ProfileFieldChange {

    private String section;
    private String field;
    private Object oldValue;
    private Object newValue;

    public ProfileFieldChange() {
    }

    public ProfileFieldChange(
            String section,
            String field,
            Object oldValue,
            Object newValue) {
        this.section = section;
        this.field = field;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public Object getOldValue() {
        return oldValue;
    }

    public void setOldValue(Object oldValue) {
        this.oldValue = oldValue;
    }

    public Object getNewValue() {
        return newValue;
    }

    public void setNewValue(Object newValue) {
        this.newValue = newValue;
    }
}
