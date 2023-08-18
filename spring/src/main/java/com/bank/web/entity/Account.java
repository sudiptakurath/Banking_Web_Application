package com.bank.web.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "accounts_tb")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "account_id", updatable = false)
    private int accountId;

    @Getter
    @Setter
    @OneToOne(mappedBy = "account")
    private User user;
    @Column(name = "fk_user_id")
    private int userId;


    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Beneficiary> beneficiaries;
    @JsonIgnore
    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "fk_kyc_id")
    private KYC kyc;

    @Column(name = "account_number")
    private Long accountNumber;
    @Column(name = "balance")
    private Float balance;
    @Column(name = "account_type")
    private String accountType;
    @Column(name = "branch_name")
    private String branchName;
    @Column(name = "account_status")
    private Integer accountStatus;
    @Column(name = "date_opened")
    private Date dateOpened;

    @PrePersist
    void valueGenerator() {
        int accountNumberLength = 7;
        long maxAccountNumber = (long) Math.pow(10, accountNumberLength);
        do {
            accountNumber = (long) (Math.random() * maxAccountNumber);
        } while (accountNumber < maxAccountNumber / 10);

        if (balance == null) {
            balance = 0F;
        }

        if (accountStatus == null) {
            accountStatus = 0;
        }

        if (dateOpened == null) {
            dateOpened = new Date();
        }
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public List<Beneficiary> getBeneficiaries() {
        return beneficiaries;
    }

    public void setBeneficiaries(List<Beneficiary> beneficiaries) {
        this.beneficiaries = beneficiaries;
    }

    public KYC getKyc() {
        return kyc;
    }

    public void setKyc(KYC kyc) {
        this.kyc = kyc;
    }

    public Long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(Long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Float getBalance() {
        return balance;
    }

    public void setBalance(Float balance) {
        this.balance = balance;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public Integer getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(Integer accountStatus) {
        this.accountStatus = accountStatus;
    }

    public Date getDateOpened() {
        return dateOpened;
    }

    public void setDateOpened(Date dateOpened) {
        this.dateOpened = dateOpened;
    }
}