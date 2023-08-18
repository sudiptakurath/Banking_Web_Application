package com.bank.web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.util.Date;

@Entity
@Table(name = "transactions_tb")
public class Statement {
    @Column(name = "transaction_id")
    private Integer transactionId;
    @Column(name = "to_acct_number")
    private Integer toAccountNumber;
    @Column(name = "to_acct_name")
    private String toAccountName;
    @Column(name = "amount")
    private Float amount;
    @Column(name = "transaction_date")
    private Date transactionDate;
    @Column(name = "fk_account_id")
    private  Integer fkAccountId;

    public Statement() {
    }


    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }


    public int getToAccountNumber() {
        return toAccountNumber;
    }

    public void setToAccountNumber(int toAccountNumber) {
        this.toAccountNumber = toAccountNumber;
    }


    public String getToAccountName() {
        return toAccountName;
    }

    public void setToAccountName(String toAccountName) {
        this.toAccountName = toAccountName;
    }


    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }
    public Integer getFkAccountId() {
        return fkAccountId;
    }

    public void setFkAccountId(Integer fkAccountId) {
        this.fkAccountId  = fkAccountId;
    }


}