package com.bank.web.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "transactions_tb")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id", updatable = false)
    private int transactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_account_id")
    @JsonBackReference
    private Account account;

    @Column(name = "transaction_date")
    private Date transactionDate;
    @Column(name = "to_acct_number")
    private Integer toAccountNumber;
    @Column(name = "to_acct_name")
    private String toAccountName;
    @Column(name = "amount")
    private Float amount;

    public Transaction() {
    }

    public Transaction(Account account, float amount) {
        this.account = account;
        this.amount = amount;
    }

    @PrePersist
    void valueGenerator() {
        if (transactionDate == null) {
            transactionDate = new Date();
        }
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }

    public Integer getToAccountNumber() {
        return toAccountNumber;
    }

    public void setToAccountNumber(Integer toAccountNumber) {
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
}